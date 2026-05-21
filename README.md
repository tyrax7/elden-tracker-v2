🗡️ Elden Tracker v2
Tracker de progression pour Elden Ring — suivez vos boss vaincus et objets collectés à travers les Terres Intermédiaires.

Projet Angular déployé sur Vercel.

Fonctionnalités
Bestiaire — liste de tous les boss du jeu avec image, région et points de vie. Marquez-les comme vaincus au fur et à mesure.
Inventaire — liste de tous les objets du jeu avec type et effet. Marquez-les comme obtenus.
Filtres par région / type — filtrez le contenu par zone ou catégorie via la sidebar.
Recherche — barre de recherche en temps réel sur les noms.
Compteur de progression — affiche le nombre d'éléments affichés et le total vaincu/obtenu.
Persistance locale — la progression est sauvegardée dans le localStorage du navigateur. Elle survit à la fermeture de la page et est propre à chaque utilisateur.
Stack
Angular 17+ — framework principal (standalone components)
Elden Ring Fan API — source des données (boss, items)
Vercel — hébergement
Installation
bash
git clone https://github.com/tyrax7/elden-tracker-v2.git
cd elden-tracker-v2
npm install
ng serve
L'application sera disponible sur http://localhost:4200.

Déploiement sur Vercel
bash
npm install -g vercel
vercel
Ou connectez le repo GitHub directement depuis le dashboard Vercel pour un déploiement automatique à chaque push.

Structure du projet
src/app/
├── components/
│   ├── home/           # Page d'accueil avec les deux entrées
│   ├── boss-list/      # Page Bestiaire
│   └── item-list/      # Page Inventaire
├── models/
│   └── boss.model.ts   # Interfaces Boss, Item, ApiResponse
└── services/
    ├── boss.service.ts  # Récupération paginée des boss
    ├── boss.resolver.ts # Chargement des boss avant navigation
    ├── item.service.ts  # Récupération paginée des items
    └── item.resolver.ts # Chargement des items avant navigation
Notes
Les données sont chargées via un Resolver Angular — la page n'apparaît qu'une fois les données prêtes, évitant tout flash de contenu vide.
La pagination est gérée automatiquement côté service pour récupérer l'intégralité des données au-delà de la limite de 100 résultats de l'API.
La progression de chaque utilisateur est stockée localement dans son navigateur — deux joueurs sur le même site ont chacun leur propre suivi indépendant.
