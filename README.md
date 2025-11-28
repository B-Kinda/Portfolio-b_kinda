# Portfolio Professionnel

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

Portfolio professionnel développé avec Next.js, TypeScript, Tailwind CSS et Prisma, présentant mes projets et compétences en développement web full-stack.

## 🚀 Fonctionnalités

- **Galerie de Projets** : Affichage des projets avec images et détails
- **Technologies Modernes** : Utilisation de Next.js 16 et TypeScript
- **Base de Données** : Gestion des projets avec PostgreSQL via Prisma
- **Design Réactif** : Interface adaptative avec Tailwind CSS
- **Animations** : Intégration de Framer Motion pour des transitions fluides

## 🛠️ Stack Technique

- **Frontend** :

  - Next.js 16 avec App Router
  - TypeScript
  - Tailwind CSS
  - Framer Motion
  - React Icons
- **Backend** :

  - API Routes de Next.js
  - Prisma ORM
  - PostgreSQL
- **Outils de Développement** :

  - ESLint
  - PostCSS
  - ts-node

## 📦 Installation

1. Cloner le dépôt :

   ```bash
   git clone [URL_DU_REPO]
   cd Portfolio-b_kinda/portfolio
   ```
2. Installer les dépendances :

   ```bash
   npm install
   ```
3. Configurer la base de données :

   - Créer un fichier `.env` à la racine du projet
   - Ajouter la variable d'environnement :
     ```
     DATABASE_URL="postgresql://user:password@localhost:5432/portfolio?schema=public"
     ```
4. Exécuter les migrations Prisma :

   ```bash
   npx prisma migrate dev --name init
   ```
5. Lancer le serveur de développement :

   ```bash
   npm run dev
   ```

## 🌐 Projets Présentés

- **GamerChallenge** : Projet de fin de formation

  - Technologies : EJS, Node.js, PostgreSQL
  - [Code source](https://github.com/B-Kinda/GamerChallenges)
- **MForMums** : Site vitrine pour une cliente

  - Technologies : EJS, Node.js, PostgreSQL
  - [Code source](https://github.com/B-Kinda/M-FOR-MUMS)
- **Site Outils** : Application web d'outils

  - Technologies : HTML, CSS, JavaScript
  - [Code source](https://github.com/B-Kinda/SITE-OUTILS)

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus d'informations.

## 📬 Contact

Pour toute question ou collaboration, n'hésitez pas à me contacter via [baptiste.lebreton97@gmail.com](mailto:baptiste.lebreton97@gmail.com).

- **Styling** : Tailwind CSS
- **Animations** : Framer Motion
- **Optimisation** : Next/Image, Lazy Loading
- **Gestion d'État** : React Hooks

## 📁 Structure du Projet

```
portfolio/
├── app/                    # Dossier principal de l'application
│   ├── components/         # Composants réutilisables
│   ├── types/              # Définitions TypeScript
│   ├── projects/           # Page des projets
│   ├── about/              # Page À propos
│   └── contact/            # Page de contact
├── public/                 # Fichiers statiques
│   └── images/             # Images du site
├── data/                   # Données de l'application
└── Docs/                   # Documentation et ressources
```

## 🚀 Installation

1. **Cloner le dépôt**

   ```bash
   git clone https://github.com/B-Kinda/Portfolio-b_kinda.git
   cd Portfolio-b_kinda/portfolio
   ```
2. **Installer les dépendances**

   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```
3. **Lancer le serveur de développement**

   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```
4. **Ouvrir dans le navigateur**

   ```
   http://localhost:3000
   ```

## 🎨 Composants Principaux

### ProjectCard

Affiche une carte de projet avec image, description et technologies utilisées.

### LuminousButton

Bouton personnalisé avec effet de survol lumineux.

### NavBar

Barre de navigation responsive avec menu mobile.

### Hero

Section d'accueil avec présentation et appel à l'action.

## 📚 Documentation

Consultez le dossier `Docs/` pour plus d'informations sur :

- L'architecture du projet
- Les bonnes pratiques
- Les guides de développement

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## 📬 Contact

- **Email**: [baptiste.lebreton97@gmail.com](mailto:baptiste.lebreton97@gmail.com)
- **GitHub**: [@B-Kinda](https://github.com/B-Kinda)
- **Portfolio**: [lien-vers-votre-portfolio.com](https://lien-vers-votre-portfolio.com) // todo

---

Développé avec ❤️ par Baptiste K. - [Visiter le site](https://votre-portfolio.com)
