# 🎓 Comprendre les composants React avec TypeScript : Un Bouton Lumineux Évolutif

## Introduction

Dans ce cours, nous allons explorer la création d'un composant `LuminousButton` moderne avec React et TypeScript. Ce composant illustre plusieurs concepts clés du développement front-end moderne.

## 1. Structure de base de la page d'accueil

### Code complet
```tsx
// Import du composant LuminousButton avec son type
import LuminousButton from "./components/LuminousButton";

export default function Home() {
  // Fonction de rappel pour gérer le changement d'état
  const handleButtonToggle = (isActive: boolean) => {
    console.log(`Bouton ${isActive ? 'activé' : 'désactivé'}`);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-8">Mon Portfolio</h1>
        
        {/* Utilisation du composant avec ses props */}
        <LuminousButton 
          text="Découvrir mon travail"
          activeText="En exploration"
          onToggle={handleButtonToggle}
          href="#projets"
          className="mt-8"
        />
      </section>
    </main>
  );
}
```

### Points clés à comprendre

1. **Structure du composant**
   - `export default function Home()` : Définition du composant principal
   - Le composant retourne du JSX qui décrit l'interface utilisateur

2. **Gestion d'état**
   - `handleButtonToggle` est une fonction de rappel (callback) qui sera exécutée lorsque l'état du bouton change
   - Elle reçoit un paramètre `isActive` de type booléen

3. **Intégration du composant**
   - `<LuminousButton />` est utilisé avec plusieurs propriétés (props) :
     - `text` : Texte affiché par défaut
     - `activeText` : Texte affiché quand le bouton est actif
     - `onToggle` : Fonction appelée lors du changement d'état
     - `href` : Lien de navigation optionnel
     - `className` : Classes CSS supplémentaires

## 2. Anatomie du composant LuminousButton

### Code complet
```tsx
"use client";
// Import des dépendances
import Link from "next/link";
import { useEffect, useState } from "react";
import type { ButtonProps } from "../types/ButtonProps";

// Définition du composant avec ses props typées
export default function LuminousButton({
  text = "Explorer mes projets",
  activeText = "Mes projets",
  isActive: externalIsActive = false,
  onToggle,
  href = "#",
  className = "",
}: ButtonProps) {
  // États locaux
  const [isLit, setIsLit] = useState(false);
  const [isActive, setIsActive] = useState(externalIsActive);

  // Effet pour synchroniser avec la prop externe
  useEffect(() => {
    setIsActive(externalIsActive);
  }, [externalIsActive]);

  // Effet pour le chargement côté client
  useEffect(() => {
    setIsLit(true);
  }, []);

  // Gestion du clic
  const handleClick = () => {
    const newState = !isActive;
    setIsActive(newState);
    onToggle?.(newState);
  };

  // État de chargement
  if (!isLit) {
    return (
      <div className={`px-8 py-3 rounded-lg bg-gray-200 animate-pulse ${className}`} />
    );
  }

  // Classes conditionnelles pour le style
  const buttonClasses = `px-8 py-3 font-bold rounded-lg transition-all duration-300 
    ${
      isActive
        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50"
        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
    } ${className}`;

  // Contenu du bouton
  const buttonContent = (
    <button 
      type="button" 
      onClick={handleClick} 
      className={buttonClasses}
      aria-pressed={isActive}
    >
      {isActive ? activeText : text}
    </button>
  );

  // Rendu conditionnel avec ou sans lien
  return href ? (
    <Link href={href} passHref legacyBehavior>
      {buttonContent}
    </Link>
  ) : (
    buttonContent
  );
}
```

## 3. Explications détaillées

### 1. Directives et imports
```typescript
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { ButtonProps } from "../types/ButtonProps";
```
- `"use client"` : Directive pour Next.js indiquant que ce composant s'exécute côté client
- `Link` : Composant Next.js pour la navigation côté client
- `useEffect` et `useState` : Hooks React pour gérer les effets secondaires et l'état
- `ButtonProps` : Interface TypeScript pour typer les propriétés du composant

### 2. Définition des props et état
```typescript
{
  text = "Explorer mes projets",
  activeText = "Mes projets",
  isActive: externalIsActive = false,
  onToggle,
  href = "#",
  className = "",
}: ButtonProps
```
- Valeurs par défaut pour toutes les props
- Désaliasing de `isActive` en `externalIsActive` pour éviter les conflits

### 3. Gestion d'état
```typescript
const [isLit, setIsLit] = useState(false);
const [isActive, setIsActive] = useState(externalIsActive);
```
- `isLit` : Contrôle l'affichage de l'état de chargement
- `isActive` : Gère l'état actif du bouton

### 4. Effets secondaires
```typescript
useEffect(() => {
  setIsActive(externalIsActive);
}, [externalIsActive]);

useEffect(() => {
  setIsLit(true);
}, []);
```
- Premier effet : Synchronisation avec la prop externe
- Deuxième effet : Simulation du chargement côté client

### 5. Gestion des interactions
```typescript
const handleClick = () => {
  const newState = !isActive;
  setIsActive(newState);
  onToggle?.(newState);
};
```
- Inverse l'état actuel
- Met à jour l'état local
- Appelle le callback `onToggle` si fourni

### 6. Rendu conditionnel
```typescript
if (!isLit) {
  return (
    <div className={`px-8 py-3 rounded-lg bg-gray-200 animate-pulse ${className}`} />
  );
}
```
- Affiche un placeholder pendant le chargement
- Utilise l'animation `animate-pulse` de Tailwind CSS

### 7. Classes conditionnelles
```typescript
const buttonClasses = `px-8 py-3 font-bold rounded-lg transition-all duration-300 
  ${
    isActive
      ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50"
      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
  } ${className}`;
```
- Styles de base communs
- Styles conditionnels selon l'état actif/inactif
- Support des classes personnalisées

## 4. Bonnes pratiques illustrées

### 1. Typage fort avec TypeScript
- Interface `ButtonProps` pour une meilleure maintenabilité
- Types explicites pour toutes les propriétés
- Valeurs par défaut pour une meilleure expérience développeur

### 2. Accessibilité
- Attribut `aria-pressed` pour les lecteurs d'écran
- Sémantique HTML appropriée avec `<button>`
- États visuels clairs (actif/inactif/survol)

### 3. Performance
- Chargement paresseux des états
- Optimisation des rendus avec des dépendances précises
- Pas de re-rendus inutiles

### 4. Expérience utilisateur
- État de chargement visuel
- Retour visuel immédiat lors des interactions
- Transitions fluides

## 5. Exercices pratiques

1. **Personnalisation**
   - Ajoutez une prop `color` pour personnaliser la couleur du bouton
   - Implémentez un effet de lueur plus prononcé au survol

2. **Accessibilité**
   - Ajoutez un attribut `aria-label` dynamique
   - Implémentez la navigation au clavier

3. **Tests**
   - Écrivez des tests unitaires pour le composant
   - Testez les différents états et interactions

## Conclusion

Ce composant `LuminousButton` illustre plusieurs concepts avancés de React et TypeScript :
- Gestion d'état avec les hooks
- Typage fort des propriétés
- Effets secondaires avec `useEffect`
- Rendu conditionnel
- Accessibilité
- Performance

En comprenant ces concepts, vous serez en mesure de créer des composants React robustes, maintenables et accessibles.
