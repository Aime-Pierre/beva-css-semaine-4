const course = {
  "config": {
    "week": 5,
    "title": "Mise en page & responsive",
    "source": "Manuel du professeur · pages 30–33 · barème p. 83",
    "rubric": [
      [
        "Structure HTML et sémantique",
        5,
        "Balises adaptées, titres hiérarchisés, code indenté."
      ],
      [
        "Mise en page et CSS",
        6,
        "Cohérence visuelle, palette limitée, lisibilité."
      ],
      [
        "Responsive",
        5,
        "Aucun débordement horizontal, menu utilisable sur mobile."
      ],
      [
        "Contenu et finition",
        4,
        "Textes rédigés, images pertinentes, liens fonctionnels."
      ]
    ]
  },
  "lessons": [
    {
      "title": "Penser en conteneurs",
      "lead": "Une page est un ensemble de boîtes que nous allons organiser.",
      "body": "<p>Bonjour à toutes et à tous ! La semaine dernière, vous avez appris à choisir les couleurs, les polices et les espacements d’une carte. Aujourd’hui, nous allons disposer plusieurs cartes côte à côte, puis les réorganiser sur téléphone. Nous conservons les mêmes contenus et nous adaptons leur présentation.</p><h2>Partir du comportement naturel</h2><p>Sans mise en page particulière, des éléments de type bloc comme <code>section</code> et <code>article</code> se placent généralement les uns sous les autres. Des liens s’écoulent plutôt dans une ligne. Ce comportement s’appelle le flux normal. Il nous donne un point de départ utile : vous n’avez pas besoin de déplacer chaque élément à la main.</p><h2>Le parent organise ses enfants</h2><p>Dans l’exemple, la section <code>.cartes</code> contient trois articles <code>.carte</code>. La section est leur parent commun. Pour organiser ces trois articles ensemble, nous appliquons la règle de mise en page à ce parent. Les titres et paragraphes sont à l’intérieur des articles : ils ne sont pas les enfants directs de la section.</p><p>Ajoutez <code>display: flex</code> à <code>.cartes</code>. Ses enfants directs deviennent des éléments flexibles. La valeur initiale de <code>flex-direction</code> est <code>row</code> : dans notre page française écrite de gauche à droite, ils se placent sur une ligne.</p><div class=\"callout\"><strong>Une erreur à comprendre</strong><p>Écrire <code>.carte { display: flex; }</code> organiserait le titre et le paragraphe dans chaque carte. Cela ne place pas les trois cartes les unes à côté des autres. Choisissez le parent du groupe que vous voulez organiser.</p></div><p><strong>Avant d’exécuter :</strong> montrez dans le HTML le parent, ses trois enfants et un petit-enfant. Expliquez quelle boîte vous allez cibler.</p>",
      "html": "<section class=\"cartes\" aria-label=\"Nos services\">\n  <article class=\"carte\"><h2>Conseil</h2><p>Clarifier votre idée et préparer votre projet.</p></article>\n  <article class=\"carte\"><h2>Création</h2><p>Créer une présence en ligne qui vous ressemble.</p></article>\n  <article class=\"carte\"><h2>Formation</h2><p>Apprendre le web grâce à des exercices concrets.</p></article>\n</section>",
      "css": "* { box-sizing: border-box; }\nbody { margin: 0; padding: 24px; font: 17px/1.6 Arial, sans-serif; color: #16324a; background: #f6f8fa; }\nh1, h2, h3 { line-height: 1.2; }\n.carte { padding: 20px; border: 1px solid #cbd5e1; border-radius: 12px; background: white; }\n\n/* Première observation : les cartes restent dans le flux normal. */\n.cartes { }",
      "task": "Placez les trois cartes sur une ligne en modifiant uniquement la règle .cartes. Ajoutez ensuite gap: 20px pour les séparer.",
      "hints": [
        "Le parent commun porte class=\"cartes\" dans le HTML.",
        "Dans .cartes, écrivez display: flex; puis gap: 20px;."
      ],
      "quizzes": [
        {
          "question": "Où placer display: flex pour aligner les trois cartes ?",
          "options": [
            "Sur le h2",
            "Sur le parent .cartes",
            "Sur chaque paragraphe"
          ],
          "answer": 1,
          "explanation": "Flexbox organise les enfants directs du conteneur qui reçoit display: flex."
        },
        {
          "question": "Les paragraphes à l’intérieur des cartes deviennent-ils les éléments flexibles de .cartes ?",
          "options": [
            "Oui, tous les descendants",
            "Non, seuls les enfants directs sont concernés"
          ],
          "answer": 1,
          "explanation": "Les trois articles sont les enfants directs. Leurs paragraphes restent dans le flux de chaque article."
        }
      ]
    },
    {
      "title": "Comprendre les deux axes",
      "lead": "Justifier, aligner et changer de direction sans deviner.",
      "body": "<p>Flexbox raisonne avec deux axes. <strong>L’axe principal</strong> suit <code>flex-direction</code>. <strong>L’axe transversal</strong> lui est perpendiculaire. Dans notre page, avec <code>row</code>, l’axe principal est horizontal ; avec <code>column</code>, il est vertical.</p><h2>Deux propriétés, deux rôles</h2><p><code>justify-content</code> répartit l’espace restant sur l’axe principal. <code>flex-start</code> rassemble au début ; <code>center</code> centre le groupe ; <code>space-between</code> place le premier élément au début et le dernier à la fin, en répartissant l’espace entre eux.</p><p><code>align-items</code> aligne les enfants sur l’axe transversal. <code>center</code> les centre sur cet axe, <code>flex-start</code> les place au début et <code>stretch</code>, la valeur initiale, peut les étirer si leur taille transversale est automatique.</p><p>Ces effets sont plus visibles s’il reste de l’espace dans le conteneur. Notre exemple lui donne une hauteur minimale de 260px et des enfants de tailles différentes. Si les enfants remplissent déjà toute la largeur, <code>justify-content</code> aura peu d’espace à répartir.</p><h2>Observer plutôt que mémoriser</h2><p>Dans le simulateur, passez de row à column. Les propriétés gardent leur nom, mais les axes changent. Avec column, justify-content agit verticalement : dire « justify-content centre toujours horizontalement » serait donc faux.</p><p><strong>Question au groupe :</strong> pour centrer un élément sur les deux axes, quelles deux propriétés choisir ? Il faut <code>justify-content: center</code> et <code>align-items: center</code>, dans un conteneur disposant d’espace.</p>",
      "html": "<div class=\"groupe\">\n  <div class=\"element\">Conseil</div>\n  <div class=\"element grand\">Création<br>sur mesure</div>\n  <div class=\"element\">Formation</div>\n</div>",
      "css": "* { box-sizing: border-box; }\nbody { margin: 0; padding: 24px; font: 17px/1.6 Arial, sans-serif; color: #16324a; background: #f6f8fa; }\nh1, h2, h3 { line-height: 1.2; }\n.groupe { display: flex; flex-direction: row; justify-content: space-between; align-items: center; gap: 16px; min-height: 260px; border: 2px dashed #087c78; padding: 16px; }\n.element { background: #16324a; color: white; padding: 16px; border-radius: 8px; }\n.grand { padding-top: 30px; padding-bottom: 30px; }",
      "task": "Centrez le groupe sur les deux axes. Passez ensuite en column et observez ce qui change.",
      "hints": [
        "Les deux règles d’alignement sont sur .groupe.",
        "La hauteur du conteneur doit laisser de l’espace pour observer le centrage vertical."
      ],
      "quizzes": [
        {
          "question": "Avec flex-direction: column, justify-content agit sur quel axe dans cet exemple ?",
          "options": [
            "L’axe vertical",
            "L’axe horizontal",
            "Les deux axes à la fois"
          ],
          "answer": 0,
          "explanation": "La direction column définit un axe principal vertical. justify-content suit toujours cet axe."
        },
        {
          "question": "Quelle propriété gère l’alignement sur l’axe transversal ?",
          "options": [
            "gap",
            "justify-content",
            "align-items"
          ],
          "answer": 2,
          "explanation": "align-items agit sur l’axe transversal ; justify-content agit sur l’axe principal."
        }
      ],
      "simulator": true
    },
    {
      "title": "Partager l’espace",
      "lead": "Des cartes de même largeur et des écarts réguliers.",
      "body": "<p>Trois cartes peuvent contenir des textes de longueurs différentes. Nous voulons leur donner des places comparables, tout en gardant le texte lisible. Utilisez <code>display: flex</code> et <code>gap: 20px</code> sur le parent, puis <code>flex: 1</code> sur les cartes.</p><h2>Comprendre flex: 1</h2><p>Cette écriture demande aux cartes de partager l’espace disponible, en leur donnant la même capacité à grandir et une base de départ nulle. Avec les mêmes bordures et le même padding, elles obtiennent ici la même largeur. Le contenu peut cependant imposer une largeur minimale : <code>min-width: 0</code> autorise les cartes à rétrécir, et <code>overflow-wrap: anywhere</code> permet de couper un mot exceptionnellement long.</p><p>Le <code>gap</code> crée l’espace entre les enfants, sans ajouter de marge extérieure au groupe. Pour trois cartes, il y a deux espaces horizontaux. Dans un conteneur de 900px avec un gap de 20px, il reste 900 − 40 = 860px, soit environ 286,7px par carte dans ce cas simple.</p><h2>Retourner à la ligne</h2><p>Par défaut, Flexbox utilise <code>flex-wrap: nowrap</code> : les éléments essaient de rester sur une ligne. <code>flex-wrap: wrap</code> autorise plusieurs lignes. Pour une variante qui revient à la ligne selon une largeur de départ, essayez <code>flex: 1 1 220px</code> sur les cartes. Les lignes se calculent séparément : une dernière carte seule peut alors occuper toute la ligne.</p><p>Le retour à la ligne automatique est utile. Pour le deuxième exercice du manuel, nous demanderons un autre comportement précis : une seule colonne à 768px et en dessous, avec une media query.</p>",
      "html": "<section class=\"cartes\" aria-label=\"Nos services\">\n  <article class=\"carte\"><h2>Conseil</h2><p>Clarifier votre idée et préparer votre projet.</p></article>\n  <article class=\"carte\"><h2>Création</h2><p>Créer une présence en ligne qui vous ressemble.</p></article>\n  <article class=\"carte\"><h2>Formation</h2><p>Apprendre le web grâce à des exercices concrets.</p></article>\n</section>",
      "css": "* { box-sizing: border-box; }\nbody { margin: 0; padding: 24px; font: 17px/1.6 Arial, sans-serif; color: #16324a; background: #f6f8fa; }\nh1, h2, h3 { line-height: 1.2; }\n.carte { padding: 20px; border: 1px solid #cbd5e1; border-radius: 12px; background: white; }\n.cartes { display: flex; gap: 20px; }\n.carte { flex: 1; min-width: 0; overflow-wrap: anywhere; }",
      "task": "Ajoutez un quatrième service et vérifiez le partage de largeur à 1024px. Essayez ensuite wrap avec flex: 1 1 220px à plusieurs largeurs.",
      "hints": [
        "Dupliquez un article complet dans le HTML, pas seulement son titre.",
        "flex-wrap se place sur .cartes ; flex: 1 1 220px se place sur .carte."
      ],
      "quizzes": [
        {
          "question": "Où écrire gap: 20px pour espacer le groupe ?",
          "options": [
            "Sur le conteneur .cartes",
            "Sur chaque h2",
            "Sur body uniquement"
          ],
          "answer": 0,
          "explanation": "gap décrit l’espace entre les éléments du conteneur Flexbox ou Grid."
        },
        {
          "question": "Quelle combinaison autorise un retour à la ligne autour de cartes de base 220px ?",
          "options": [
            "flex-wrap: nowrap et width: 100%",
            "flex-wrap: wrap sur le parent et flex: 1 1 220px sur les cartes",
            "text-align: center sur les cartes"
          ],
          "answer": 1,
          "explanation": "wrap autorise les nouvelles lignes ; la base de 220px participe à la décision de retour à la ligne."
        }
      ]
    },
    {
      "title": "Découvrir une grille simple",
      "lead": "Des colonnes et des lignes avec CSS Grid.",
      "body": "<p>Flexbox est particulièrement pratique pour organiser un groupe sur un axe : un menu ou une rangée de cartes. Grid permet de définir une grille de colonnes et de lignes. Les deux outils se complètent ; vous pouvez utiliser Flexbox pour le menu et Grid pour une galerie.</p><h2>Trois colonnes égales</h2><p><code>display: grid</code> se place sur le conteneur. <code>grid-template-columns: repeat(3, minmax(0, 1fr))</code> crée trois colonnes égales. <code>repeat(3, …)</code> répète trois fois une définition ; <code>1fr</code> représente une part de l’espace disponible, après les écarts ; <code>minmax(0, 1fr)</code> autorise la colonne à rétrécir sans être bloquée par une taille minimale de contenu.</p><p>Comme avec Flexbox, <code>gap: 20px</code> espace les éléments. Les cartes se placent dans l’ordre du HTML : la quatrième commence la ligne suivante. Gardez un ordre HTML logique pour la lecture et la navigation au clavier.</p><h2>Choisir selon le besoin</h2><p>Un menu avec un logo et des liens : Flexbox convient. Une galerie avec des colonnes alignées d’une rangée à l’autre : Grid convient. L’exercice « Trois cartes » du manuel utilise Flexbox ; cette grille est une démonstration complémentaire pour comprendre les deux possibilités.</p><p>Ne cherchez pas encore à tout maîtriser. Pour cette semaine, savoir définir une grille simple puis remplacer trois colonnes par une colonne sur petit écran suffit.</p>",
      "html": "<section class=\"cartes\" aria-label=\"Nos services\">\n  <article class=\"carte\"><h2>Conseil</h2><p>Clarifier votre idée et préparer votre projet.</p></article>\n  <article class=\"carte\"><h2>Création</h2><p>Créer une présence en ligne qui vous ressemble.</p></article>\n  <article class=\"carte\"><h2>Formation</h2><p>Apprendre le web grâce à des exercices concrets.</p></article>\n  <article class=\"carte\"><h2>Suivi</h2><p>Améliorer votre site après sa mise en ligne.</p></article>\n</section>",
      "css": "* { box-sizing: border-box; }\nbody { margin: 0; padding: 24px; font: 17px/1.6 Arial, sans-serif; color: #16324a; background: #f6f8fa; }\nh1, h2, h3 { line-height: 1.2; }\n.carte { padding: 20px; border: 1px solid #cbd5e1; border-radius: 12px; background: white; }\n.cartes { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }\n.carte { overflow-wrap: anywhere; }",
      "task": "Passez de trois colonnes à deux, puis à une. Expliquez où se place la quatrième carte à chaque fois.",
      "hints": [
        "Modifiez le premier nombre de repeat().",
        "Pour une colonne, grid-template-columns: 1fr suffit."
      ],
      "quizzes": [
        {
          "question": "Que signifie repeat(3, minmax(0, 1fr)) ?",
          "options": [
            "Trois lignes de 1 pixel",
            "Une seule colonne très large",
            "Trois colonnes partageant l’espace disponible"
          ],
          "answer": 2,
          "explanation": "Le nombre 3 est le nombre de colonnes définies ici ; chaque 1fr reçoit une part égale."
        },
        {
          "question": "Quel outil est adapté à un menu disposé sur un axe ?",
          "options": [
            "Flexbox",
            "Une image de fond",
            "font-size"
          ],
          "answer": 0,
          "explanation": "Flexbox organise facilement un groupe sur un axe, avec des alignements et des écarts."
        }
      ]
    },
    {
      "title": "Préparer une page flexible",
      "lead": "Largeurs, images et viewport : les bases du responsive.",
      "body": "<p>Un site responsive adapte sa mise en page à l’espace disponible. Il ne s’agit pas de fabriquer une page différente pour chaque modèle de téléphone. Nous construisons une structure souple, puis nous ajoutons des ajustements quand la place manque.</p><h2>Dire au téléphone d’utiliser sa vraie largeur</h2><p>Placez dans le head : <code>&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"&gt;</code>. Cette balise indique au navigateur mobile d’utiliser la largeur de l’appareil comme largeur de mise en page. Sans elle, il peut présenter une version de bureau réduite, ce qui rend le texte minuscule et les seuils trompeurs. Le laboratoire et les fichiers HTML exportés l’incluent déjà.</p><h2>Limiter sans figer</h2><p>Un conteneur avec <code>width: 100%; max-width: 1000px; margin: auto</code> prend la place disponible sans dépasser 1000px. Le padding du body laisse de l’air sur les côtés. Avec <code>box-sizing: border-box</code>, bordures et padding sont inclus dans les largeurs déclarées.</p><p>Une largeur fixe de 900px peut dépasser un écran de 360px. La solution consiste à rendre la boîte flexible. Cacher le débordement avec <code>overflow-x: hidden</code> pourrait masquer du contenu : cherchons d’abord l’élément trop large.</p><h2>Une image qui garde ses proportions</h2><p><code>img { max-width: 100%; height: auto; }</code> empêche l’image de dépasser son conteneur tout en conservant ses proportions. Une description alt adaptée reste nécessaire. L’illustration de cet exemple est incluse dans le code pour fonctionner sans Internet.</p><p><strong>À observer :</strong> le texte reste-t-il lisible à 360px ? L’image tient-elle dans sa boîte ? Le navigateur de l’aperçu montre-t-il un défilement horizontal à l’intérieur de la page ?</p>",
      "html": "<main class=\"page\">\n<h1>Votre site, partout.</h1>\n<p>Le même contenu, une présentation adaptée.</p>\n<img src=\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22420%22%20viewBox%3D%220%200%20900%20420%22%3E%3Crect%20width%3D%22900%22%20height%3D%22420%22%20fill%3D%22%23dcebe5%22%2F%3E%3Crect%20x%3D%2270%22%20y%3D%2265%22%20width%3D%22480%22%20height%3D%22290%22%20rx%3D%2218%22%20fill%3D%22%2316324a%22%2F%3E%3Crect%20x%3D%2290%22%20y%3D%2290%22%20width%3D%22440%22%20height%3D%22225%22%20rx%3D%226%22%20fill%3D%22%23f6f8fa%22%2F%3E%3Crect%20x%3D%22120%22%20y%3D%22120%22%20width%3D%22160%22%20height%3D%2220%22%20rx%3D%228%22%20fill%3D%22%23087c78%22%2F%3E%3Crect%20x%3D%22120%22%20y%3D%22170%22%20width%3D%22110%22%20height%3D%22110%22%20rx%3D%2210%22%20fill%3D%22%23dcebe5%22%2F%3E%3Crect%20x%3D%22250%22%20y%3D%22170%22%20width%3D%22110%22%20height%3D%22110%22%20rx%3D%2210%22%20fill%3D%22%23dcebe5%22%2F%3E%3Crect%20x%3D%22380%22%20y%3D%22170%22%20width%3D%22110%22%20height%3D%22110%22%20rx%3D%2210%22%20fill%3D%22%23dcebe5%22%2F%3E%3Crect%20x%3D%22640%22%20y%3D%22100%22%20width%3D%22150%22%20height%3D%22240%22%20rx%3D%2224%22%20fill%3D%22%2316324a%22%2F%3E%3Crect%20x%3D%22654%22%20y%3D%22125%22%20width%3D%22122%22%20height%3D%22190%22%20rx%3D%228%22%20fill%3D%22%23f6f8fa%22%2F%3E%3Crect%20x%3D%22670%22%20y%3D%22146%22%20width%3D%2290%22%20height%3D%2235%22%20rx%3D%226%22%20fill%3D%22%23087c78%22%2F%3E%3Crect%20x%3D%22670%22%20y%3D%22196%22%20width%3D%2290%22%20height%3D%2235%22%20rx%3D%226%22%20fill%3D%22%23dcebe5%22%2F%3E%3Crect%20x%3D%22670%22%20y%3D%22246%22%20width%3D%2290%22%20height%3D%2235%22%20rx%3D%226%22%20fill%3D%22%23dcebe5%22%2F%3E%3C%2Fsvg%3E\" alt=\"Une même page de services sur un ordinateur et un téléphone\" width=\"900\" height=\"420\">\n</main>",
      "css": "* { box-sizing: border-box; }\nbody { margin: 0; padding: 24px; font: 17px/1.6 Arial, sans-serif; color: #16324a; background: #f6f8fa; }\nh1, h2, h3 { line-height: 1.2; }\n.page { width: 100%; max-width: 1000px; margin: auto; }\nimg { display: block; max-width: 100%; height: auto; border-radius: 12px; }",
      "task": "Comparez l’aperçu à 1024px et à 360px. Remplacez temporairement max-width: 100% de l’image par width: 900px pour comprendre le débordement, puis réparez-le.",
      "hints": [
        "La largeur en pixels de l’aperçu est la largeur utilisée par la page testée.",
        "Remettez max-width: 100%; height: auto; pour réparer l’image."
      ],
      "quizzes": [
        {
          "question": "À quoi sert la balise viewport ?",
          "options": [
            "À centrer une carte",
            "À indiquer au navigateur mobile comment définir sa largeur de mise en page",
            "À télécharger le CSS"
          ],
          "answer": 1,
          "explanation": "width=device-width fait correspondre la largeur de mise en page à celle de l’appareil."
        },
        {
          "question": "Quelle règle préserve les proportions d’une image flexible ?",
          "options": [
            "max-width: 100%; height: auto;",
            "width: 900px; height: 100px;",
            "display: none;"
          ],
          "answer": 0,
          "explanation": "La largeur peut diminuer et la hauteur s’ajuste selon les proportions de l’image."
        }
      ]
    },
    {
      "title": "Écrire une media query",
      "lead": "À 768px et en dessous, la disposition change.",
      "body": "<p>Une media query est une condition qui décide quand certaines règles CSS s’appliquent. <code>@media (max-width: 768px)</code> signifie : si la largeur du viewport est inférieure ou égale à 768 pixels CSS, appliquer les règles entre ces accolades.</p><h2>Lire le code de l’extérieur vers l’intérieur</h2><p>La règle de base <code>.cartes { display: flex; gap: 20px; }</code> s’applique à toutes les largeurs. Dans la condition, <code>.cartes { flex-direction: column; }</code> remplace seulement la direction. display et gap restent actifs. Nous ajoutons aussi de plus petites tailles pour h1 et h2.</p><p>Le bloc contient une paire d’accolades pour la condition, puis une paire pour chaque sélecteur. Une accolade manquante peut perturber les règles suivantes. Indentez le code pour voir les niveaux. Placez ce bloc après les règles de base : à spécificité égale, la dernière déclaration applicable l’emporte.</p><div class=\"callout\"><strong>Le test qui lève le doute</strong><p>Essayez 767px, 768px puis 769px. À 768px, max-width inclut encore la limite : les cartes sont verticales. À 769px, elles reviennent sur une ligne. Le seuil du manuel est un repère d’apprentissage ; en pratique, un seuil se choisit aussi selon le contenu.</p></div><h2>Et l’approche mobile d’abord ?</h2><p>On peut écrire la disposition en colonne comme base, puis utiliser <code>@media (min-width: 769px)</code> pour passer en ligne. Les deux méthodes fonctionnent. Dans ce cours, nous gardons max-width pour suivre les exemples du manuel sans mélanger les approches.</p><p>Pour une grille, le même principe devient <code>.grille { grid-template-columns: 1fr; }</code> dans la condition. Pour un menu Flexbox, il devient <code>nav { flex-direction: column; }</code>.</p>",
      "html": "<h1>Des services pour avancer</h1>\n<section class=\"cartes\" aria-label=\"Nos services\">\n  <article class=\"carte\"><h2>Conseil</h2><p>Clarifier votre idée et préparer votre projet.</p></article>\n  <article class=\"carte\"><h2>Création</h2><p>Créer une présence en ligne qui vous ressemble.</p></article>\n  <article class=\"carte\"><h2>Formation</h2><p>Apprendre le web grâce à des exercices concrets.</p></article>\n</section>",
      "css": "* { box-sizing: border-box; }\nbody { margin: 0; padding: 24px; font: 17px/1.6 Arial, sans-serif; color: #16324a; background: #f6f8fa; }\nh1, h2, h3 { line-height: 1.2; }\n.carte { padding: 20px; border: 1px solid #cbd5e1; border-radius: 12px; background: white; }\n.cartes { display: flex; gap: 20px; }\n.carte { flex: 1; min-width: 0; overflow-wrap: anywhere; }\nh1 { font-size: 3rem; }\n@media (max-width: 768px) {\n  .cartes { flex-direction: column; }\n  h1 { font-size: 1.8rem; }\n  h2 { font-size: 1.3rem; }\n}\n",
      "task": "Testez 767, 768 et 769px. Remplacez ensuite le seuil par 600px et dites précisément quand le changement se produit.",
      "hints": [
        "Utilisez le champ « Largeur » de l’aperçu ; le cadre possède réellement cette largeur.",
        "Pour garder le seuil du manuel dans les exercices finaux, remettez 768px."
      ],
      "quizzes": [
        {
          "question": "À exactement 768px, @media (max-width: 768px) est…",
          "options": [
            "Inactive",
            "Active",
            "Dépendante de la marque du téléphone"
          ],
          "answer": 1,
          "explanation": "max-width inclut la limite : la condition est vraie à 768px et en dessous."
        },
        {
          "question": "Que devient gap lorsque la media query change seulement flex-direction ?",
          "options": [
            "Il disparaît",
            "Il vaut automatiquement 0",
            "Il conserve sa valeur de base"
          ],
          "answer": 2,
          "explanation": "Les déclarations non remplacées continuent de s’appliquer. Seule la direction change ici."
        }
      ]
    },
    {
      "title": "Tester comme un développeur",
      "lead": "Vérifier la navigation et expliquer une correction.",
      "body": "<p>Une page réussie reste utilisable, pas seulement jolie dans une capture. Le menu doit permettre de rejoindre les bonnes sections, les textes doivent rester lisibles et les éléments ne doivent pas dépasser sur téléphone.</p><h2>Un menu simple et fonctionnel</h2><p>Dans notre exemple, le header est un premier conteneur Flexbox qui organise la marque et le menu. Le nav est un second conteneur Flexbox qui organise ses liens. Ce sont deux niveaux différents. Sur mobile, chacun peut changer de direction.</p><p>Un lien <code>href=\"#services\"</code> rejoint l’élément portant <code>id=\"services\"</code>. Le mot doit correspondre exactement. Les identifiants sont uniques. Nous gardons les liens visibles sur mobile : aucun menu à ouvrir en JavaScript n’est nécessaire cette semaine.</p><h2>Notre procédure de vérification</h2><ol><li>À 1024px, observez l’équilibre des sections et les cartes.</li><li>À 768px puis 360px, vérifiez le menu, les titres et les images.</li><li>Cliquez sur chaque lien du menu : atteint-il la bonne section ?</li><li>Utilisez Tab pour vérifier que les liens et les champs sont atteignables et que le focus est visible.</li><li>Ouvrez le projet téléchargé dans un navigateur, puis les outils de développement et leur mode mobile. Essayez aussi un vrai téléphone si possible.</li></ol><h2>Diagnostiquer un débordement</h2><p>Cherchez une largeur fixe, une image trop grande, un mot très long ou un enfant flexible qui refuse de rétrécir. Corrigez la cause, puis retestez. Si une media query semble inactive, vérifiez la balise viewport, le seuil, les accolades et l’ordre des règles.</p><p><strong>À expliquer à un camarade :</strong> « J’ai observé … ; la règle responsable était … ; je l’ai remplacée par … ; voici le résultat à 360px. » Cette démarche comptera autant que le résultat visuel pour votre apprentissage.</p>",
      "html": "<header class=\"entete\">\n  <a class=\"marque\" href=\"#presentation\">Studio Étoile</a>\n  <nav aria-label=\"Menu principal\"><a href=\"#presentation\">Présentation</a><a href=\"#services\">Services</a><a href=\"#contact\">Contact</a></nav>\n</header>\n<main>\n  <section id=\"presentation\"><h1>Votre présence en ligne</h1><p>Nous donnons forme à vos projets.</p></section>\n  <section id=\"services\"><h2>Nos services</h2><p>Conseil, création et formation.</p></section>\n  <section id=\"contact\"><h2>Contact</h2><p>Présentons notre projet et nos coordonnées ici.</p></section>\n</main>",
      "css": "* { box-sizing: border-box; }\nbody { margin: 0; padding: 24px; font: 17px/1.6 Arial, sans-serif; color: #16324a; background: #f6f8fa; }\nh1, h2, h3 { line-height: 1.2; }\n.entete { display: flex; justify-content: space-between; align-items: center; gap: 24px; }\nnav { display: flex; flex-wrap: wrap; gap: 16px; }\na { color: #087c78; padding: 10px 0; }\na:hover { text-decoration-thickness: 3px; }\na:focus-visible { outline: 3px solid #16324a; outline-offset: 4px; }\n.marque { font-weight: bold; }\nsection { padding: 36px 0; }\n@media (max-width: 768px) {\n  .entete { flex-direction: column; align-items: flex-start; }\n  nav { flex-direction: column; gap: 4px; }\n}\n",
      "task": "Testez les trois liens dans l’aperçu, puis passez à 360px. Expliquez pourquoi .entete et nav reçoivent chacun display: flex.",
      "hints": [
        "Le header organise deux enfants : la marque et le nav.",
        "Le nav organise ses propres enfants : les liens. Sa direction ne dépend pas automatiquement de celle du header."
      ],
      "quizzes": [
        {
          "question": "Un lien href=\"#contact\" doit correspondre à…",
          "options": [
            "class=\"contact\" uniquement",
            "id=\"contact\"",
            "Une propriété CSS contact"
          ],
          "answer": 1,
          "explanation": "Une ancre interne rejoint l’élément qui porte cet identifiant."
        },
        {
          "question": "Face à un débordement horizontal sur mobile, la première démarche est…",
          "options": [
            "Masquer toute la page qui dépasse",
            "Supprimer le texte",
            "Identifier l’élément trop large et corriger sa règle"
          ],
          "answer": 2,
          "explanation": "Le masquage peut cacher du contenu utile. Cherchez la largeur fixe, l’image ou la contrainte responsable."
        }
      ]
    }
  ],
  "exercises": [
    {
      "title": "Exercice 1 · Trois cartes",
      "lead": "Manuel, page 31 · 25 minutes",
      "body": "<p>Créez trois cartes de service sur une même ligne, utilisez gap pour l’espace et donnez la même largeur aux cartes. Travaillez d’abord avec un aperçu de 1024px.</p><ol><li>Repérez le parent commun et vérifiez que les trois articles sont ses enfants directs.</li><li>Activez Flexbox sur ce parent.</li><li>Ajoutez un espace de 20px entre les cartes.</li><li>Partagez l’espace avec flex: 1 sur chaque carte.</li><li>Expliquez les deux sélecteurs au groupe, puis comparez les largeurs.</li></ol><p>Le HTML et les styles décoratifs sont fournis pour concentrer votre travail sur la disposition. Le passage en colonne sera traité dans l’exercice suivant.</p>",
      "html": "<section class=\"cartes\" aria-label=\"Nos services\">\n  <article class=\"carte\"><h2>Conseil</h2><p>Clarifier votre idée et préparer votre projet.</p></article>\n  <article class=\"carte\"><h2>Création</h2><p>Créer une présence en ligne qui vous ressemble.</p></article>\n  <article class=\"carte\"><h2>Formation</h2><p>Apprendre le web grâce à des exercices concrets.</p></article>\n</section>",
      "css": "* { box-sizing: border-box; }\nbody { margin: 0; padding: 24px; font: 17px/1.6 Arial, sans-serif; color: #16324a; background: #f6f8fa; }\nh1, h2, h3 { line-height: 1.2; }\n.carte { padding: 20px; border: 1px solid #cbd5e1; border-radius: 12px; background: white; }\n\n/* À compléter : organisez le parent et partagez la largeur entre ses enfants. */",
      "solution": "* { box-sizing: border-box; }\nbody { margin: 0; padding: 24px; font: 17px/1.6 Arial, sans-serif; color: #16324a; background: #f6f8fa; }\nh1, h2, h3 { line-height: 1.2; }\n.carte { padding: 20px; border: 1px solid #cbd5e1; border-radius: 12px; background: white; }\n.cartes { display: flex; gap: 20px; }\n.carte { flex: 1; min-width: 0; overflow-wrap: anywhere; }\n",
      "hints": [
        "La disposition du groupe appartient à .cartes.",
        "Ajoutez display: flex et gap: 20px au parent ; flex: 1 sur chaque .carte.",
        "Les mêmes padding et bordures rendent la comparaison juste. min-width: 0 permet aux cartes de rétrécir."
      ],
      "criteria": [
        "À 1024px, mes trois cartes sont sur une ligne.",
        "Le gap du parent vaut 20px.",
        "Mes cartes partagent la largeur et j’explique flex: 1."
      ],
      "explanation": [
        [
          "Le conteneur",
          ".cartes reçoit display: flex : ses trois articles se placent sur l’axe principal."
        ],
        [
          "L’espace entre les cartes",
          "gap crée deux écarts de 20px pour trois cartes ; aucune marge extérieure n’est ajoutée par gap."
        ],
        [
          "Le partage de largeur",
          "flex: 1 distribue l’espace. min-width: 0 et overflow-wrap protègent contre des contenus particulièrement longs."
        ]
      ]
    },
    {
      "title": "Exercice 2 · Version mobile",
      "lead": "Manuel, pages 31–32 · 25 minutes",
      "body": "<p>Faites passer les cartes verticalement sur petit écran, réduisez les grands titres et empêchez les images de déborder. Le code de départ reprend une rangée fonctionnelle, mais l’image n’est pas encore flexible.</p><ol><li>Observez le problème à 360px avant de modifier le CSS.</li><li>Rendez l’image adaptable avec max-width et height.</li><li>Ajoutez @media (max-width: 768px) après les règles de base.</li><li>Dans ce bloc, passez les cartes en colonne et réduisez h1 et h2.</li><li>Testez 360, 768 et 769px. Notez à quelle largeur les cartes changent.</li></ol><p>Le texte du manuel dit « à moins de 768px » ; son code utilise max-width: 768px. Nous suivons ce code : <strong>768px est inclus</strong>. Le viewport est déjà présent dans le laboratoire et dans le HTML téléchargé.</p>",
      "html": "<h1>Nos services, sur tous les écrans</h1>\n<img src=\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22420%22%20viewBox%3D%220%200%20900%20420%22%3E%3Crect%20width%3D%22900%22%20height%3D%22420%22%20fill%3D%22%23dcebe5%22%2F%3E%3Crect%20x%3D%2270%22%20y%3D%2265%22%20width%3D%22480%22%20height%3D%22290%22%20rx%3D%2218%22%20fill%3D%22%2316324a%22%2F%3E%3Crect%20x%3D%2290%22%20y%3D%2290%22%20width%3D%22440%22%20height%3D%22225%22%20rx%3D%226%22%20fill%3D%22%23f6f8fa%22%2F%3E%3Crect%20x%3D%22120%22%20y%3D%22120%22%20width%3D%22160%22%20height%3D%2220%22%20rx%3D%228%22%20fill%3D%22%23087c78%22%2F%3E%3Crect%20x%3D%22120%22%20y%3D%22170%22%20width%3D%22110%22%20height%3D%22110%22%20rx%3D%2210%22%20fill%3D%22%23dcebe5%22%2F%3E%3Crect%20x%3D%22250%22%20y%3D%22170%22%20width%3D%22110%22%20height%3D%22110%22%20rx%3D%2210%22%20fill%3D%22%23dcebe5%22%2F%3E%3Crect%20x%3D%22380%22%20y%3D%22170%22%20width%3D%22110%22%20height%3D%22110%22%20rx%3D%2210%22%20fill%3D%22%23dcebe5%22%2F%3E%3Crect%20x%3D%22640%22%20y%3D%22100%22%20width%3D%22150%22%20height%3D%22240%22%20rx%3D%2224%22%20fill%3D%22%2316324a%22%2F%3E%3Crect%20x%3D%22654%22%20y%3D%22125%22%20width%3D%22122%22%20height%3D%22190%22%20rx%3D%228%22%20fill%3D%22%23f6f8fa%22%2F%3E%3Crect%20x%3D%22670%22%20y%3D%22146%22%20width%3D%2290%22%20height%3D%2235%22%20rx%3D%226%22%20fill%3D%22%23087c78%22%2F%3E%3Crect%20x%3D%22670%22%20y%3D%22196%22%20width%3D%2290%22%20height%3D%2235%22%20rx%3D%226%22%20fill%3D%22%23dcebe5%22%2F%3E%3Crect%20x%3D%22670%22%20y%3D%22246%22%20width%3D%2290%22%20height%3D%2235%22%20rx%3D%226%22%20fill%3D%22%23dcebe5%22%2F%3E%3C%2Fsvg%3E\" alt=\"Une même page de services sur un ordinateur et un téléphone\" width=\"900\" height=\"420\">\n<section class=\"cartes\" aria-label=\"Nos services\">\n  <article class=\"carte\"><h2>Conseil</h2><p>Clarifier votre idée et préparer votre projet.</p></article>\n  <article class=\"carte\"><h2>Création</h2><p>Créer une présence en ligne qui vous ressemble.</p></article>\n  <article class=\"carte\"><h2>Formation</h2><p>Apprendre le web grâce à des exercices concrets.</p></article>\n</section>",
      "css": "* { box-sizing: border-box; }\nbody { margin: 0; padding: 24px; font: 17px/1.6 Arial, sans-serif; color: #16324a; background: #f6f8fa; }\nh1, h2, h3 { line-height: 1.2; }\n.carte { padding: 20px; border: 1px solid #cbd5e1; border-radius: 12px; background: white; }\n.cartes { display: flex; gap: 20px; }\n.carte { flex: 1; min-width: 0; overflow-wrap: anywhere; }\nh1 { font-size: 3rem; }\nimg { display: block; margin: 0 0 24px; }\n/* Ajoutez les règles pour les images et la media query. */\n",
      "solution": "* { box-sizing: border-box; }\nbody { margin: 0; padding: 24px; font: 17px/1.6 Arial, sans-serif; color: #16324a; background: #f6f8fa; }\nh1, h2, h3 { line-height: 1.2; }\n.carte { padding: 20px; border: 1px solid #cbd5e1; border-radius: 12px; background: white; }\n.cartes { display: flex; gap: 20px; }\n.carte { flex: 1; min-width: 0; overflow-wrap: anywhere; }\nh1 { font-size: 3rem; }\nimg { display: block; max-width: 100%; height: auto; margin: 0 0 24px; }\n@media (max-width: 768px) {\n  .cartes { flex-direction: column; }\n  h1 { font-size: 1.8rem; }\n  h2 { font-size: 1.3rem; }\n}\n",
      "hints": [
        "Traitez l’image avec img { max-width: 100%; height: auto; }.",
        "Dans @media, ciblez .cartes pour changer sa direction. N’oubliez pas les accolades des deux niveaux.",
        "Réduisez h1 à 1.8rem et h2 à 1.3rem. Vérifiez aussi le résultat à 769px pour comparer."
      ],
      "criteria": [
        "À 360px et à 768px, les cartes sont verticales.",
        "À 769px, les cartes reprennent la disposition en ligne.",
        "Les grands titres sont réduits et l’image conserve ses proportions.",
        "J’ai vérifié l’absence de débordement dans la page de l’aperçu."
      ],
      "explanation": [
        [
          "L’image",
          "max-width: 100% empêche de dépasser le parent ; height: auto conserve les proportions."
        ],
        [
          "La condition",
          "Le bloc max-width est actif à 768px et en dessous. À 769px, seule la disposition de base s’applique."
        ],
        [
          "Les modifications ciblées",
          "La direction et les tailles changent ; les bordures, le padding et le gap définis avant le bloc restent en place."
        ]
      ]
    },
    {
      "title": "Projet du mois · Page professionnelle",
      "lead": "Manuel, pages 32–33 · 55 minutes + 15 minutes de retour",
      "body": "<p>Créez une page pour une personne ou une entreprise. Vous pouvez reprendre la page entreprise travaillée en semaines 3 et 4 en collant son HTML et son CSS dans le laboratoire. À défaut, personnalisez le modèle Studio Étoile ci-dessous.</p><ol><li>Rédigez le nom, la présentation et trois services adaptés à votre activité.</li><li>Construisez un header avec menu, une présentation, les services, un contact et un footer.</li><li>Utilisez Flexbox pour les cartes et le menu. La présentation peut utiliser une grille simple.</li><li>Gardez une palette cohérente, une police lisible et le CSS dans un fichier séparé.</li><li>Rendez le projet utilisable à 1024px et à 360px : menu visible, champs accessibles, images contenues, aucun débordement.</li><li>Présentez-le à un camarade, notez une qualité et une amélioration, puis précisez la modification que vous appliquez.</li></ol><p><strong>Livrable :</strong> un dossier avec index.html et style.css, accompagné des deux remarques et de votre décision. Le formulaire est une interface de démonstration ; l’envoi de messages ne fait pas partie du programme HTML/CSS.</p>",
      "html": "<header class=\"entete\">\n  <a class=\"marque\" href=\"#presentation\">Studio Étoile</a>\n  <nav aria-label=\"Navigation principale\">\n    <a href=\"#presentation\">Présentation</a>\n    <a href=\"#services\">Services</a>\n    <a href=\"#contact\">Contact</a>\n  </nav>\n</header>\n<main>\n  <section id=\"presentation\" class=\"hero\">\n    <div><p class=\"accroche\">Des idées aux premières pages</p><h1>Votre site, simplement.</h1><p>Nous aidons les petites entreprises à présenter leurs activités avec une page claire, utile et accessible sur téléphone.</p><a class=\"bouton\" href=\"#services\">Découvrir nos services</a></div>\n    <img src=\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22900%22%20height%3D%22420%22%20viewBox%3D%220%200%20900%20420%22%3E%3Crect%20width%3D%22900%22%20height%3D%22420%22%20fill%3D%22%23dcebe5%22%2F%3E%3Crect%20x%3D%2270%22%20y%3D%2265%22%20width%3D%22480%22%20height%3D%22290%22%20rx%3D%2218%22%20fill%3D%22%2316324a%22%2F%3E%3Crect%20x%3D%2290%22%20y%3D%2290%22%20width%3D%22440%22%20height%3D%22225%22%20rx%3D%226%22%20fill%3D%22%23f6f8fa%22%2F%3E%3Crect%20x%3D%22120%22%20y%3D%22120%22%20width%3D%22160%22%20height%3D%2220%22%20rx%3D%228%22%20fill%3D%22%23087c78%22%2F%3E%3Crect%20x%3D%22120%22%20y%3D%22170%22%20width%3D%22110%22%20height%3D%22110%22%20rx%3D%2210%22%20fill%3D%22%23dcebe5%22%2F%3E%3Crect%20x%3D%22250%22%20y%3D%22170%22%20width%3D%22110%22%20height%3D%22110%22%20rx%3D%2210%22%20fill%3D%22%23dcebe5%22%2F%3E%3Crect%20x%3D%22380%22%20y%3D%22170%22%20width%3D%22110%22%20height%3D%22110%22%20rx%3D%2210%22%20fill%3D%22%23dcebe5%22%2F%3E%3Crect%20x%3D%22640%22%20y%3D%22100%22%20width%3D%22150%22%20height%3D%22240%22%20rx%3D%2224%22%20fill%3D%22%2316324a%22%2F%3E%3Crect%20x%3D%22654%22%20y%3D%22125%22%20width%3D%22122%22%20height%3D%22190%22%20rx%3D%228%22%20fill%3D%22%23f6f8fa%22%2F%3E%3Crect%20x%3D%22670%22%20y%3D%22146%22%20width%3D%2290%22%20height%3D%2235%22%20rx%3D%226%22%20fill%3D%22%23087c78%22%2F%3E%3Crect%20x%3D%22670%22%20y%3D%22196%22%20width%3D%2290%22%20height%3D%2235%22%20rx%3D%226%22%20fill%3D%22%23dcebe5%22%2F%3E%3Crect%20x%3D%22670%22%20y%3D%22246%22%20width%3D%2290%22%20height%3D%2235%22%20rx%3D%226%22%20fill%3D%22%23dcebe5%22%2F%3E%3C%2Fsvg%3E\" alt=\"Une même page de services sur un ordinateur et un téléphone\" width=\"900\" height=\"420\">\n  </section>\n  <section id=\"services\">\n    <h2>Un accompagnement à chaque étape</h2>\n    <div class=\"cartes\">\n  <article class=\"carte\"><h3>Conseil</h3><p>Clarifier votre idée et préparer votre projet.</p></article>\n  <article class=\"carte\"><h3>Création</h3><p>Créer une présence en ligne qui vous ressemble.</p></article>\n  <article class=\"carte\"><h3>Formation</h3><p>Apprendre le web grâce à des exercices concrets.</p></article>\n</div>\n  </section>\n  <section id=\"contact\">\n    <h2>Parlons de votre projet</h2>\n    <p>Formulaire de démonstration : aucun message n’est envoyé.</p>\n    <form>\n      <label for=\"nom\">Votre nom</label><input id=\"nom\" name=\"nom\" autocomplete=\"name\">\n      <label for=\"email\">Votre adresse e-mail</label><input id=\"email\" name=\"email\" type=\"email\" autocomplete=\"email\">\n      <label for=\"message\">Votre projet</label><textarea id=\"message\" name=\"message\" rows=\"4\"></textarea>\n      <button type=\"button\">Bouton de démonstration</button>\n    </form>\n  </section>\n</main>\n<footer><p>© 2026 Studio Étoile · Projet du mois 1</p></footer>",
      "css": "/* Personnalisez le HTML, puis construisez votre CSS.\n   1. Base et palette\n   2. Conteneurs et menu\n   3. Présentation et cartes\n   4. Contact et footer\n   5. Adaptation à 768px et en dessous */\n",
      "solution": ":root { --principal: #16324a; --accent: #087c78; --fond: #f6f8fa; }\n* { box-sizing: border-box; }\nbody { margin: 0; background: var(--fond); color: var(--principal); font: 18px/1.6 Arial, sans-serif; }\n.entete, main, footer { width: 92%; max-width: 1100px; margin: auto; }\n.entete { display: flex; justify-content: space-between; align-items: center; gap: 24px; padding: 24px 0; }\nnav { display: flex; flex-wrap: wrap; gap: 18px; }\na { color: var(--accent); }\na:hover { text-decoration-thickness: 3px; }\na:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible { outline: 3px solid var(--accent); outline-offset: 4px; }\n.marque { font-weight: bold; font-size: 1.25rem; color: var(--principal); }\nsection { padding: 36px 0; }\nh1 { font-size: 3rem; line-height: 1.1; }\nh2 { font-size: 1.8rem; line-height: 1.2; }\nh3 { font-size: 1.2rem; }\np { overflow-wrap: anywhere; }\n.hero { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 32px; align-items: center; }\n.hero img { width: 100%; }\nimg { display: block; max-width: 100%; height: auto; border-radius: 12px; }\n.cartes { display: flex; gap: 20px; }\n.carte { flex: 1; min-width: 0; padding: 20px; border: 1px solid var(--principal); border-radius: 12px; }\nform { max-width: 620px; }\nlabel { display: block; margin-top: 14px; }\ninput, textarea { width: 100%; padding: 12px; border: 1px solid var(--principal); border-radius: 8px; font: inherit; color: var(--principal); background: var(--fond); }\n.bouton, button { display: inline-block; padding: 12px 18px; margin-top: 16px; border: 0; border-radius: 8px; font: inherit; color: var(--fond); background: var(--accent); text-decoration: none; }\n.bouton:hover, button:hover { background: var(--principal); }\nfooter { padding: 24px 0; border-top: 1px solid var(--principal); }\n@media (max-width: 768px) {\n  .entete, nav, .cartes { flex-direction: column; }\n  .entete { align-items: flex-start; }\n  nav { gap: 8px; }\n  .hero { grid-template-columns: 1fr; }\n  h1 { font-size: 1.8rem; }\n  h2 { font-size: 1.3rem; }\n  section { padding: 24px 0; }\n}\n",
      "hints": [
        "Commencez par les cinq zones du HTML et leurs ancres. Écrivez ensuite la base typographique et la largeur maximale.",
        "Réutilisez .cartes { display: flex; gap: 20px; } puis .carte { flex: 1; min-width: 0; }.",
        "Ajoutez la media query : menu et cartes en colonne, présentation sur une colonne, titres plus petits. Testez les liens et le clavier."
      ],
      "criteria": [
        "La page contient un menu, une présentation, des services, un contact et un footer.",
        "Mes textes et mon identité visuelle sont personnalisés.",
        "Mon CSS est séparé et mes liens de navigation fonctionnent.",
        "À 360px, le menu est utilisable et la page ne déborde pas horizontalement.",
        "J’ai recueilli deux remarques et décrit une amélioration appliquée."
      ],
      "project": true,
      "explanation": [
        [
          "La structure",
          "Le header contient la marque et le menu ; les ancres renvoient aux trois sections. Le contact possède des labels liés aux champs."
        ],
        [
          "Les deux mises en page",
          "Flexbox organise le menu et les cartes. Grid crée deux colonnes dans la présentation. Chaque outil agit sur son propre conteneur."
        ],
        [
          "L’adaptation",
          "La condition transforme les groupes en colonnes et la grille en une colonne. Les images gardent une largeur maximale de 100%."
        ],
        [
          "La finition",
          "Les styles de focus rendent le clavier visible. Les couleurs sont réutilisées, les contenus sont rédigés et le formulaire annonce son rôle de démonstration."
        ],
        [
          "Votre propre solution",
          "Le modèle est un support de discussion. Votre projet doit refléter votre activité et intégrer la remarque choisie, pas seulement recopier Studio Étoile."
        ]
      ]
    }
  ]
};
