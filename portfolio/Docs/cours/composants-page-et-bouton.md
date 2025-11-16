# Comprendre les composants : Page d'accueil et Bouton Lumineux

## 1. La page d'accueil (`page.tsx`)

### Structure de base
```tsx
// Import du composant LuminousButton
import LuminousButton from "./components/LuminousButton";

// Définition du composant de la page d'accueil
export default function Home() {
  return (
    <section className="text-center py-20 bg-gray-900 text-white">
      {/* Contenu de la page */}
    </section>
  );
}
```

### Explications détaillées

1. **Import du composant**
   - `import LuminousButton from "./components/LuminousButton"`
   - On importe le composant `LuminousButton` depuis son emplacement
   - Le chemin est relatif au fichier actuel (`./` signifie "dans le même dossier que ce fichier")

2. **Composant fonctionnel**
   - `export default function Home()`
   - Crée un composant React fonctionnel nommé `Home`
   - `export default` permet de l'importer depuis d'autres fichiers

3. **Structure JSX**
   - Utilisation de balises JSX pour décrire l'interface
   - Les classes Tailwind CSS sont utilisées pour le style
     - `text-center` : centre le texte
     - `py-20` : ajoute un padding vertical de 5rem (20 * 0.25rem)
     - `bg-gray-900` : fond gris très foncé
     - `text-white` : texte blanc

4. **Intégration du composant**
   - `<LuminousButton />`
   - Utilisation du composant importé
   - Les composants en React commencent par une majuscule

## 2. Le composant LuminousButton (`LuminousButton.jsx`)

### Structure de base
```jsx
"use client";
import Link from "next/link";
import { useState } from "react";

export default function LuminousButton() {
  const [isLit, setIsLit] = useState(false);
  
  const handleClick = () => {
    setIsLit(!isLit);
  };

  const buttonClasses = `px-8 py-3 font-bold rounded-lg transition-all duration-300 ${
    isLit ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
  }`;

  return (
    <Link href="#events">
      <button type="button" onClick={handleClick} className={buttonClasses}>
        {isLit ? "mode lumineux Activé" : "Explorez mes Projets"}
      </button>
    </Link>
  );
}
```

### Explications détaillées

1. **Directive "use client"**
   - `"use client";`
   - Indique que ce composant s'exécute côté client (nécessaire pour les hooks comme `useState`)

2. **Imports**
   - `import Link from "next/link";` : Composant Next.js pour la navigation
   - `import { useState } from "react";` : Hook React pour gérer l'état local

3. **État du composant**
   - `const [isLit, setIsLit] = useState(false);`
   - Crée une variable d'état `isLit` initialisée à `false`
   - `setIsLit` est la fonction pour mettre à jour cette variable

4. **Gestionnaire d'événements**
   ```jsx
   const handleClick = () => {
     setIsLit(!isLit);
   };
   ```
   - Inverse la valeur de `isLit` à chaque clic
   - Si `isLit` est `true`, il devient `false` et vice versa

5. **Classes conditionnelles**
   ```jsx
   const buttonClasses = `px-8 py-3 font-bold rounded-lg transition-all duration-300 ${
     isLit ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
   }`;
   ```
   - Utilise des littéraux de gabarit (backticks) pour créer une chaîne dynamique
   - Classes conditionnelles basées sur `isLit`
   - `transition-all duration-300` : animation fluide des changements de style

6. **Rendu du composant**
   - `<Link href="#events">` : Crée un lien vers l'ancre #events
   - Le texte du bouton change en fonction de l'état `isLit`
   - `onClick={handleClick}` : Déclenche `handleClick` au clic

## 3. Interaction entre les composants

1. **Flux de données**
   - `page.tsx` importe et utilise `LuminousButton`
   - `LuminousButton` gère son propre état interne (`isLit`)
   - Les changements d'état déclenchent un nouveau rendu du composant

2. **Cycle de vie**
   - Au chargement de la page, `isLit` est `false`
   - Au clic, `handleClick` inverse la valeur de `isLit`
   - Le changement d'état déclenche un nouveau rendu avec les nouvelles classes CSS

## 4. Bonnes pratiques illustrées

1. **Composants réutilisables**
   - `LuminousButton` est autonome et peut être réutilisé
   - Gère son propre état local

2. **Séparation des préoccupations**
   - `page.tsx` s'occupe de la structure de la page
   - `LuminousButton` gère la logique du bouton

3. **Accessibilité**
   - Utilisation de `<button type="button">` pour les éléments cliquables
   - Texte explicite qui change avec l'état

4. **Performance**
   - Seul le composant `LuminousButton` est re-rendu lors des changements d'état
   - Pas de rendu inutile de la page entière
