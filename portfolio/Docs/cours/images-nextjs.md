# 🖼️ Guide Complet des Images dans Next.js

## Table des Matières
1. [Introduction](#introduction)
2. [Le Composant Image de Next.js](#le-composant-image)
3. [Optimisation Automatique](#optimisation-automatique)
4. [Import d'Images](#import-dimages)
5. [Images Distantes](#images-distantes)
6. [Placeholders et Chargement](#placeholders-et-chargement)
7. [Bonnes Pratiques](#bonnes-pratiques)
8. [Exemple avec ProjectCard](#exemple-avec-projectcard)

## Introduction

Dans Next.js, la gestion des images est grandement simplifiée grâce au composant `next/image`. Ce composant offre :
- Chargement paresseux (lazy loading) par défaut
- Optimisation automatique des images
- Prévention du Cumulative Layout Shift (CLS)
- Support du format WebP moderne

## Le Composant Image

### Importation
```typescript
import Image from 'next/image';
```

### Utilisation de Base
```tsx
<Image
  src="/chemin/vers/image.jpg"
  alt="Description de l'image"
  width={500}
  height={300}
/>
```

⚠️ **Important** : Vous devez toujours spécifier `width` et `height` pour éviter les sauts de mise en page.

## Optimisation Automatique

Next.js optimise automatiquement les images :
- Conversion en WebP/AVIF quand c'est possible
- Redimensionnement selon les besoins
- Compression intelligente

## Import d'Images

### 1. Images Locales

1. Placez vos images dans le dossier `public/`
2. Utilisez le chemin relatif depuis `public/`

```tsx
// Dans public/images/projets/projet1.jpg
<Image
  src="/images/projets/projet1.jpg"
  alt="Projet 1"
  width={800}
  height={450}
/>
```

### 2. Avec Import Statique

```typescript
import projetImage from '@/public/images/projets/projet1.jpg';

// Utilisation
<Image
  src={projetImage}
  alt="Projet 1"
  // width et height sont automatiquement détectés
  placeholder="blur" // Optionnel: effet de flou pendant le chargement
/>
```

## Images Distantes

Pour les images hébergées ailleurs :

```tsx
<Image
  src="https://example.com/images/projet.jpg"
  alt="Projet distant"
  width={800}
  height={450}
  // Obligatoire pour les images distantes
  blurDataURL="data:image/jpeg;base64,..." // Optionnel: placeholder
/>
```

## Placeholders et Chargement

### 1. Placeholder flou
```tsx
<Image
  src={projetImage}
  alt="Projet avec placeholder"
  placeholder="blur"
/>
```

### 2. Couleur de fond de remplacement
```tsx
<div className="relative w-full h-64 bg-gray-200">
  <Image
    src={projetImage}
    alt="Projet avec fond de remplacement"
    fill
    className="object-cover"
  />
</div>
```

## Bonnes Pratiques

1. **Taille des Images** :
   - Utilisez des images de la bonne taille
   - Évitez de redimensionner avec CSS

2. **Formats** :
   - Privilégiez WebP pour les photos
   - Utilisez SVG pour les logos et icônes

3. **Accessibilité** :
   - Toujours fournir un texte `alt` descriptif
   - Utilisez `priority` pour les images au-dessus de la ligne de flottaison

## Exemple avec ProjectCard

Voici comment nous utilisons les images dans notre composant ProjectCard :

```tsx
// Dans ProjectCard.tsx
<Image
  src={project.img}  // Chemin vers l'image
  alt={`Aperçu du projet ${project.name}`}
  width={400}        // Largeur maximale
  height={225}       // Hauteur proportionnelle
  className="object-cover w-full h-48"
  placeholder="blur" // Effet de flou pendant le chargement
  blurDataURL="data:image/png;base64,..." // Miniature de très basse qualité
/>
```

### Configuration dans next.config.js

Pour utiliser des images distantes, configurez les domaines autorisés :

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['images.unsplash.com', 'votredomaine.com'],
  },
}
```

## Dépannage

1. **Erreur de domaine non configuré** :
   ```
   Error: Invalid src prop
   ```
   Solution : Ajoutez le domaine dans `next.config.js`

2. **Images floues** :
   - Vérifiez que la taille de l'image est suffisante
   - Utilisez `quality={100}` si nécessaire

3. **Problèmes de performances** :
   - Utilisez `priority` pour les images critiques
   - Optimisez la taille des images avant l'import

## Ressources Utiles

- [Documentation officielle Next.js Image](https://nextjs.org/docs/api-reference/next/image)
- [Optimize Images with next/image](https://nextjs.org/learn/seo/improve/images)
- [Image Optimization Guide](https://web.dev/fast/#optimize-your-images)
