'use strict';
const $ = (selector) => document.querySelector(selector);
const steps = [...course.lessons, ...course.exercises];
const lessonCount = course.lessons.length;
const storageKey = 'beva-css-semaine-5-v1';
const emptyState = () => ({ drafts: {}, done: [], quizzes: {}, attempted: {}, checks: {}, peer: { quality: '', improvement: '', applied: '' } });
let state = emptyState();
let current = -1;
let storageAvailable = true;
let toastTimer;
let observer;
let previewWidth = 1024;
try {
  const saved = JSON.parse(localStorage.getItem(storageKey));
  if (saved && typeof saved === 'object') {
    for (const key of ['drafts', 'quizzes', 'attempted', 'checks']) {
      if (saved[key] && typeof saved[key] === 'object' && !Array.isArray(saved[key])) state[key] = saved[key];
    }
    if (Array.isArray(saved.done)) state.done = saved.done.filter(i => Number.isInteger(i) && i >= 0 && i < steps.length);
    for (const key of ['quality', 'improvement', 'applied']) {
      if (typeof saved.peer?.[key] === 'string') state.peer[key] = saved.peer[key];
    }
  }
} catch (_) { storageAvailable = false; }

function escapeHtml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}
function toast(message) {
  $('#toast').textContent = message;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { $('#toast').textContent = ''; }, 5000);
}
function persist() {
  try { localStorage.setItem(storageKey, JSON.stringify(state)); storageAvailable = true; }
  catch (_) { storageAvailable = false; }
  updateProgress();
}
function saveMessage(prefix = '') {
  const target = $('#saveStatus');
  if (target) target.textContent = storageAvailable ? prefix + 'Brouillon enregistré sur cet appareil.' : 'Sauvegarde indisponible dans ce navigateur. Téléchargez votre projet pour le conserver.';
}
function updateProgress() {
  const count = new Set(state.done).size;
  $('#progress').max = steps.length;
  $('#progress').value = count;
  $('#progressText').textContent = `${count} / ${steps.length} étapes terminées`;
  document.querySelectorAll('#nav a[data-step]').forEach(link => {
    const i = Number(link.dataset.step);
    link.querySelector('span').textContent = i < 0 ? '↗' : state.done.includes(i) ? '✓' : String(i + 1).padStart(2, '0');
  });
}
function confirmation(title, message, action) {
  $('#confirmTitle').textContent = title;
  $('#confirmText').textContent = message;
  const dialog = $('#confirmDialog');
  dialog.returnValue = '';
  dialog.onclose = () => { if (dialog.returnValue === 'confirm') action(); };
  dialog.showModal();
}
function getDraft() {
  const draft = state.drafts[current];
  return draft && typeof draft.html === 'string' && typeof draft.css === 'string' ? draft : { html: steps[current].html, css: steps[current].css };
}
function capture() {
  if (current < 0 || !$('#html')) return;
  state.drafts[current] = { html: $('#html').value, css: $('#css').value };
  persist();
  saveMessage('Code modifié : exécutez pour actualiser l’aperçu. ');
}
function documentSource(html, css, preview = false) {
  // The editor expects the body fragment; accepting a complete HTML file also works.
  const parsed = new DOMParser().parseFromString(html, 'text/html');
  const body = parsed.body.innerHTML;
  const head = preview
    ? '<meta http-equiv="Content-Security-Policy" content="default-src \'none\'; style-src \'unsafe-inline\'; img-src data:; font-src data:; form-action \'none\'"><base href="about:srcdoc"><style>' + css + '</style>'
    : '<link rel="stylesheet" href="style.css">';
  return '<!doctype html>\n<html lang="fr">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>Mon projet responsive · BEVA</title>\n' + head + '\n</head>\n<body>\n' + body + '\n</body>\n</html>\n';
}
function execute(user = false) {
  capture();
  const draft = getDraft();
  $('#preview').srcdoc = documentSource(draft.html, draft.css, true);
  const changed = draft.html.trim() !== steps[current].html.trim() || draft.css.trim() !== steps[current].css.trim();
  if (user && changed && current >= lessonCount) {
    state.attempted[current] = true;
    persist();
    $('#correctionBtn').disabled = false;
    $('#correctionGate').textContent = 'Essai exécuté. Comparez vos observations aux consignes avant de consulter la solution.';
  } else if (user && !changed && current >= lessonCount && !state.attempted[current]) {
    $('#correctionGate').textContent = 'Vous avez exécuté le code de départ. Modifiez au moins une règle, puis exécutez votre essai pour débloquer la correction.';
  }
  saveMessage(user ? 'Aperçu actualisé. ' : '');
}
function setPreviewWidth(width) {
  previewWidth = Math.min(1440, Math.max(320, Math.round(Number(width) || 1024)));
  $('#widthNumber').value = previewWidth;
  $('#preview').style.width = previewWidth + 'px';
  $('#preview').style.minWidth = previewWidth + 'px';
  $('#widthStatus').textContent = `${previewWidth}px · ${previewWidth <= 768 ? 'condition max-width: 768px active' : 'condition max-width: 768px inactive'}`;
  document.querySelectorAll('[data-width]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.width) === previewWidth)));
}
function rubric() {
  return '<table class="rubric"><caption class="sr-only">Barème du projet du mois 1 sur 20</caption><thead><tr><th scope="col">Critère</th><th scope="col">Points</th><th scope="col">Attendus</th></tr></thead><tbody>' + course.config.rubric.map(r => `<tr><th scope="row">${r[0]}</th><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('') + '</tbody><tfoot><tr><td>Total</td><td>20</td><td>Évaluation par le formateur</td></tr></tfoot></table>';
}
function laboratory(step) {
  const draft = getDraft();
  return `<section class="lab" aria-label="Laboratoire HTML et CSS"><div class="labbar"><b>Votre laboratoire</b><button class="primary" id="run">▶ Exécuter mon code</button><button id="restore">Reprendre le code initial</button></div><div class="editors"><label>HTML · contenu du body<textarea id="html" aria-label="Code HTML" spellcheck="false">${escapeHtml(draft.html)}</textarea></label><label>CSS · fichier style.css<textarea id="css" aria-label="Code CSS" spellcheck="false">${escapeHtml(draft.css)}</textarea></label></div><div class="preview-controls"><strong>TESTER À</strong><button data-width="360" aria-pressed="false">Téléphone · 360</button><button data-width="768" aria-pressed="false">Seuil · 768</button><button data-width="1024" aria-pressed="true">Ordinateur · 1024</button><label>Largeur <input id="widthNumber" type="number" min="320" max="1440" value="1024" step="1" aria-label="Largeur de l’aperçu en pixels"> px</label><button id="applyWidth">Appliquer</button></div><p class="preview-explain" id="widthStatus" role="status"></p><div class="previewwrap" tabindex="0" aria-label="Zone de l’aperçu ; défilez horizontalement si le cadre dépasse"><iframe id="preview" title="Aperçu de votre page HTML et CSS" sandbox="" referrerpolicy="no-referrer"></iframe></div><p class="preview-explain">Le cadre garde la largeur choisie, même sur un petit écran. Faites défiler cette zone pour voir le cadre entier. Le défilement de cette zone est distinct d’un débordement <em>dans</em> votre page.</p><p class="labnote" id="saveStatus" role="status"></p><div class="labbar"><button id="downloadZip">↓ Télécharger mon projet (.zip)</button><button id="downloadHtml">index.html</button><button id="downloadCss">style.css</button></div><p class="labnote">Le HTML exporté contient la balise viewport et le lien vers style.css. L’aperçu exécute HTML/CSS ; les scripts, les envois de formulaire et les ressources externes sont désactivés.</p></section>`;
}
function quizPanel(step) {
  return `<form class="quiz" id="quiz"><p class="eyebrow">VÉRIFIER SA COMPRÉHENSION</p><h2>Expliquez avant de continuer.</h2>${step.quizzes.map((q, qi) => `<fieldset><legend>${qi + 1}. ${q.question}</legend>${q.options.map((option, oi) => `<label><input type="radio" name="q${qi}" value="${oi}" required ${state.quizzes[current]?.[qi] === oi ? 'checked' : ''}> ${option}</label>`).join('')}<p id="answer-${qi}" class="feedback" role="status"></p></fieldset>`).join('')}<button type="submit">Vérifier mes réponses</button><p id="quizStatus" class="feedback" role="status"></p></form>`;
}
function peerPanel() {
  return `<section class="peer"><h3>Le retour de mon camarade</h3><p>Présentez la page sur ordinateur et en vue téléphone. Notez une qualité, une amélioration et la décision que vous prenez.</p><label>Une qualité observée<textarea id="peer-quality" placeholder="Ex. Le menu reste facile à utiliser sur téléphone.">${escapeHtml(state.peer.quality)}</textarea></label><label>Une amélioration proposée<textarea id="peer-improvement" placeholder="Ex. Donner plus d’espace entre les champs du formulaire.">${escapeHtml(state.peer.improvement)}</textarea></label><label>La modification que j’ai appliquée<textarea id="peer-applied" placeholder="Décrivez votre changement et la façon dont vous l’avez testé.">${escapeHtml(state.peer.applied)}</textarea></label><p class="notice">Ces remarques restent sur cet appareil et sont ajoutées à votre projet téléchargé.</p><button id="downloadFeedback">Télécharger les remarques</button></section>`;
}
function exercisePanel(step) {
  return `<section class="quiz"><p class="eyebrow">ESSAYER · OBSERVER · EXPLIQUER</p><h2>Des indices avant la solution.</h2><button id="hintBtn">Afficher le premier indice</button><ol class="hintlist" id="hintList"></ol><p class="notice" id="correctionGate">${state.attempted[current] ? 'Un essai a été exécuté. La correction est disponible.' : 'Modifiez le code et exécutez votre essai pour débloquer la correction.'}</p><button id="correctionBtn" ${state.attempted[current] ? '' : 'disabled'} aria-expanded="false" aria-controls="correction">Voir la correction guidée</button><div class="correction" id="correction" hidden><h3>Comprendre une solution possible</h3>${step.explanation.map(([heading, text]) => `<h4>${heading}</h4><p>${text}</p>`).join('')}<pre><code>${escapeHtml(step.solution)}</code></pre><button id="applySolution">Essayer le CSS de la correction</button><p class="notice">Ce CSS correspond au HTML de départ. Si vous avez changé la structure ou les classes, adaptez les sélecteurs à votre propre page.</p></div><h3>Mes critères de réussite</h3><div class="checklist">${step.criteria.map((text, i) => `<label><input type="checkbox" data-check="${i}" ${state.checks[current]?.[i] ? 'checked' : ''}> ${text}</label>`).join('')}</div><p class="notice">Vous cochez ce que vous avez réellement vérifié. Ces cases sont une auto-évaluation ; le formateur examine le code et le résultat.</p>${step.project ? `<h3>Barème officiel · /20</h3>${rubric()}${peerPanel()}` : ''}<p id="exerciseStatus" class="feedback" role="status"></p></section>`;
}
function simulator() {
  return `<section class="simulation" aria-label="Simulateur Flexbox"><p class="eyebrow">UNE MINUTE POUR VOIR LES AXES</p><h2>Manipulez le conteneur.</h2><div class="sim-controls"><label>flex-direction<select id="simDirection"><option value="row">row · ligne</option><option value="column">column · colonne</option></select></label><label>justify-content<select id="simJustify"><option>flex-start</option><option>center</option><option>space-between</option><option>space-around</option><option>flex-end</option></select></label><label>align-items<select id="simAlign"><option>center</option><option>flex-start</option><option>stretch</option><option>flex-end</option></select></label><label>gap · <span id="simGapValue">16px</span><input type="range" id="simGap" aria-label="Espacement du simulateur" min="0" max="40" value="16"></label></div><p class="axisnote" id="axisNote" role="status"></p><div class="simbox" id="simBox"><div class="simitem">Conseil</div><div class="simitem">Création<br>sur mesure</div><div class="simitem">Formation</div></div><code class="simcode" id="simCode"></code><p class="notice">Ce simulateur est indépendant du code ci-dessous : reproduisez ensuite vos choix dans le laboratoire.</p></section>`;
}
function bindSimulator() {
  const update = () => {
    const direction = $('#simDirection').value, justify = $('#simJustify').value, align = $('#simAlign').value, gap = $('#simGap').value;
    Object.assign($('#simBox').style, { flexDirection: direction, justifyContent: justify, alignItems: align, gap: gap + 'px' });
    $('#simGapValue').textContent = gap + 'px';
    $('#axisNote').textContent = direction === 'row' ? 'Axe principal horizontal → justify-content. Axe transversal vertical ↓ align-items.' : 'Axe principal vertical ↓ justify-content. Axe transversal horizontal → align-items.';
    $('#simCode').textContent = `.groupe {\n  display: flex;\n  flex-direction: ${direction};\n  justify-content: ${justify};\n  align-items: ${align};\n  gap: ${gap}px;\n}`;
  };
  ['simDirection', 'simJustify', 'simAlign', 'simGap'].forEach(id => { $('#' + id).oninput = update; });
  update();
}
function feedbackText() {
  return 'BEVA — Semaine 5 — Retour entre camarades\n\nUne qualité :\n' + state.peer.quality + '\n\nUne amélioration proposée :\n' + state.peer.improvement + '\n\nModification appliquée et testée :\n' + state.peer.applied + '\n';
}
function download(name, content, type = 'text/plain;charset=utf-8') {
  const link = document.createElement('a');
  const blob = content instanceof Blob ? content : new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  link.href = url; link.download = name;
  document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 3000);
  toast('Téléchargement lancé : ' + name);
}
// ZIP sans compression : fonctionne hors connexion, sans bibliothèque externe.
function makeZip(entries) {
  const encoder = new TextEncoder();
  const parts = [], central = [];
  let offset = 0;
  const crc32 = bytes => {
    let crc = 0xffffffff;
    for (const byte of bytes) {
      crc ^= byte;
      for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
    return (crc ^ 0xffffffff) >>> 0;
  };
  for (const [name, value] of entries) {
    const filename = encoder.encode(name), data = encoder.encode(value), crc = crc32(data);
    const local = new Uint8Array(30 + filename.length), lv = new DataView(local.buffer);
    lv.setUint32(0, 0x04034b50, true); lv.setUint16(4, 20, true); lv.setUint16(6, 0x0800, true); lv.setUint16(12, 0x21, true);
    lv.setUint32(14, crc, true); lv.setUint32(18, data.length, true); lv.setUint32(22, data.length, true); lv.setUint16(26, filename.length, true); local.set(filename, 30);
    const directory = new Uint8Array(46 + filename.length), dv = new DataView(directory.buffer);
    dv.setUint32(0, 0x02014b50, true); dv.setUint16(4, 20, true); dv.setUint16(6, 20, true); dv.setUint16(8, 0x0800, true); dv.setUint16(14, 0x21, true);
    dv.setUint32(16, crc, true); dv.setUint32(20, data.length, true); dv.setUint32(24, data.length, true); dv.setUint16(28, filename.length, true); dv.setUint32(42, offset, true); directory.set(filename, 46);
    parts.push(local, data); central.push(directory); offset += local.length + data.length;
  }
  const centralSize = central.reduce((sum, part) => sum + part.length, 0);
  const end = new Uint8Array(22), ev = new DataView(end.buffer);
  ev.setUint32(0, 0x06054b50, true); ev.setUint16(8, entries.length, true); ev.setUint16(10, entries.length, true); ev.setUint32(12, centralSize, true); ev.setUint32(16, offset, true);
  return new Blob([...parts, ...central, end], { type: 'application/zip' });
}
function bindLab() {
  $('#html').oninput = capture; $('#css').oninput = capture;
  $('#run').onclick = () => execute(true);
  $('#restore').onclick = () => confirmation('Reprendre le code initial ?', 'Le brouillon de cette étape sera remplacé. Téléchargez votre version si vous souhaitez la conserver.', () => {
    $('#html').value = steps[current].html; $('#css').value = steps[current].css; execute(false);
  });
  document.querySelectorAll('[data-width]').forEach(button => { button.onclick = () => setPreviewWidth(button.dataset.width); });
  $('#applyWidth').onclick = () => setPreviewWidth($('#widthNumber').value);
  $('#widthNumber').onchange = () => setPreviewWidth($('#widthNumber').value);
  $('#widthNumber').onkeydown = e => { if (e.key === 'Enter') setPreviewWidth(e.target.value); };
  $('#downloadHtml').onclick = () => { capture(); const d = getDraft(); download('index.html', documentSource(d.html, d.css), 'text/html;charset=utf-8'); };
  $('#downloadCss').onclick = () => { capture(); download('style.css', getDraft().css, 'text/css;charset=utf-8'); };
  $('#downloadZip').onclick = () => {
    capture(); const d = getDraft();
    const entries = [['index.html', documentSource(d.html, d.css)], ['style.css', d.css]];
    if (steps[current].project) entries.push(['retour-camarade.txt', feedbackText()]);
    download(`BEVA-semaine-5-etape-${current + 1}.zip`, makeZip(entries));
  };
  setPreviewWidth(1024);
  execute(false);
}
function bindQuiz(step) {
  $('#quiz').onsubmit = event => {
    event.preventDefault();
    const answers = step.quizzes.map((_, i) => Number($(`input[name="q${i}"]:checked`).value));
    state.quizzes[current] = answers;
    let correct = 0;
    step.quizzes.forEach((q, i) => {
      const good = answers[i] === q.answer;
      if (good) correct++;
      $(`#answer-${i}`).textContent = (good ? '✓ Bien vu. ' : 'À revoir. ') + q.explanation;
      $(`#answer-${i}`).className = 'feedback ' + (good ? 'ok' : 'error');
    });
    $('#quizStatus').textContent = correct === step.quizzes.length ? 'Les deux réponses sont correctes. Vous pouvez valider cette étape.' : 'Relisez les explications puis essayez à nouveau.';
    persist();
  };
}
function bindExercise(step) {
  let hintsShown = 0;
  $('#hintBtn').onclick = () => {
    const item = document.createElement('li'); item.textContent = step.hints[hintsShown++]; $('#hintList').append(item);
    $('#hintBtn').textContent = hintsShown === step.hints.length ? 'Tous les indices sont affichés' : 'Afficher l’indice suivant';
    $('#hintBtn').disabled = hintsShown === step.hints.length;
  };
  $('#correctionBtn').onclick = () => {
    const opening = $('#correction').hidden;
    $('#correction').hidden = !opening;
    $('#correctionBtn').setAttribute('aria-expanded', String(opening));
    $('#correctionBtn').textContent = opening ? 'Masquer la correction' : 'Revoir la correction guidée';
  };
  $('#applySolution').onclick = () => confirmation('Essayer le CSS de la correction ?', 'Votre CSS sera remplacé. Votre HTML restera en place ; adaptez-le si ses classes diffèrent du modèle. Téléchargez votre projet pour conserver votre essai.', () => {
    $('#css').value = step.solution; execute(true); $('.lab').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  document.querySelectorAll('[data-check]').forEach(check => {
    check.onchange = () => {
      state.checks[current] = [...document.querySelectorAll('[data-check]')].map(input => input.checked);
      persist();
    };
  });
  if (step.project) {
    for (const key of ['quality', 'improvement', 'applied']) $('#peer-' + key).oninput = e => { state.peer[key] = e.target.value; persist(); };
    $('#downloadFeedback').onclick = () => download('retour-camarade.txt', feedbackText());
  }
}
function completeStep() {
  const step = steps[current];
  if (current < lessonCount && !step.quizzes.every((q, i) => state.quizzes[current]?.[i] === q.answer)) {
    $('#quizStatus').textContent = 'Répondez aux deux questions et vérifiez vos réponses avant de valider.';
    $('#quiz').scrollIntoView({ behavior: 'smooth' }); return;
  }
  if (current >= lessonCount) {
    const valid = state.attempted[current] && step.criteria.every((_, i) => state.checks[current]?.[i]);
    if (!valid) { $('#exerciseStatus').textContent = 'Exécutez un essai modifié puis cochez les critères que vous avez vérifiés.'; $('#exerciseStatus').scrollIntoView({ behavior: 'smooth' }); return; }
    if (step.project && !['quality', 'improvement', 'applied'].every(key => state.peer[key].trim())) {
      $('#exerciseStatus').textContent = 'Complétez les deux remarques de votre camarade et la modification que vous avez appliquée.';
      $('.peer').scrollIntoView({ behavior: 'smooth' }); return;
    }
  }
  if (!state.done.includes(current)) state.done.push(current);
  persist(); $('#complete').textContent = '✓ Étape terminée';
  toast(state.done.length === steps.length ? 'Bravo ! Votre parcours est terminé. Présentez votre projet au formateur.' : 'Étape validée. Vous pouvez poursuivre le parcours.');
}
function render() {
  const match = location.hash.match(/^#etape-(\d+)$/);
  current = match ? Number(match[1]) - 1 : -1;
  if (current < 0 || current >= steps.length) current = -1;
  $('#home').hidden = current >= 0; $('#lesson').hidden = current < 0;
  document.querySelectorAll('#nav a[data-step]').forEach(link => {
    if (Number(link.dataset.step) === current) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
  });
  updateProgress();
  if (current < 0) return;
  const step = steps[current], isLesson = current < lessonCount;
  $('#lesson').innerHTML = `<header class="lessonhead"><p class="eyebrow">${isLesson ? 'SÉANCE 1 · LEÇON ' + String(current + 1).padStart(2, '0') : 'SÉANCE 2 · MISE EN PRATIQUE'}</p><h1>${step.title}</h1><p class="lead">${step.lead}</p></header><div class="prose">${step.body}</div>${step.simulator ? simulator() : ''}${isLesson ? `<div class="task"><strong>À vous de jouer</strong><p>${step.task}</p><details><summary>Un coup de pouce</summary><ol>${step.hints.map(h => `<li>${h}</li>`).join('')}</ol></details></div>` : ''}${laboratory(step)}${isLesson ? quizPanel(step) : exercisePanel(step)}<div class="bottomnav"><button id="previous">← ${current === 0 ? 'Accueil' : 'Étape précédente'}</button><button id="complete">${state.done.includes(current) ? '✓ Étape terminée' : 'Valider cette étape'}</button><button id="next" class="primary">${current === steps.length - 1 ? 'Retour au parcours' : 'Étape suivante →'}</button></div>`;
  bindLab();
  if (isLesson) bindQuiz(step); else bindExercise(step);
  if (step.simulator) bindSimulator();
  $('#previous').onclick = () => { location.hash = current === 0 ? 'accueil' : 'etape-' + current; };
  $('#next').onclick = () => { location.hash = current === steps.length - 1 ? 'accueil' : 'etape-' + (current + 2); };
  $('#complete').onclick = completeStep;
}
$('#nav').innerHTML = '<a href="#accueil" data-step="-1"><span>↗</span>Vue d’ensemble</a><p class="navgroup">SÉANCE 1 · COMPRENDRE</p>' + steps.map((step, i) => (i === lessonCount ? '<p class="navgroup">SÉANCE 2 · PRATIQUER</p>' : '') + `<a href="#etape-${i + 1}" data-step="${i}"><span>${String(i + 1).padStart(2, '0')}</span>${step.title.replace(/Exercice \d · /, '').replace('Projet du mois · ', '')}</a>`).join('');
$('#homeRubric').innerHTML = rubric();
$('#start').onclick = () => { location.hash = 'etape-1'; };
$('#projector').onclick = () => $('#projector').setAttribute('aria-pressed', String(document.body.classList.toggle('projector')));
$('#resetProgress').onclick = () => confirmation('Réinitialiser la semaine 5 ?', 'Les brouillons, quiz, remarques et validations de cette semaine seront effacés de ce navigateur. Téléchargez vos projets pour les conserver.', () => { state = emptyState(); persist(); render(); toast('Les données de la semaine 5 ont été réinitialisées.'); });
window.addEventListener('hashchange', () => {
  if (location.hash === '#content') { $('#content').focus(); return; }
  render(); $('#content').focus({ preventScroll: true }); window.scrollTo(0, 0);
});
render();
