# Guide des Composants de Projet

## Table des Matières

1. [Introduction](#introduction)
2. [Structure des Fichiers](#structure-des-fichiers)
3. [Détails des Fichiers](#détails-des-fichiers)
   - [Project.ts (Types)](#projectts)
   - [projects.ts (Données)](#projectsts)
   - [ProjectCard.tsx (Composant)](#projectcardtsx)
4. [Comment Ils Fonctionnent Ensemble](#comment-ils-fonctionnent-ensemble)
5. [Exemple d&#39;Utilisation](#exemple-dutilisation)
6. [Bonnes Pratiques](#bonnes-pratiques)

## Introduction

Ce document explique l'architecture et le fonctionnement des composants liés aux projets dans ce portfolio Next.js. Nous allons explorer trois fichiers clés qui travaillent ensemble pour afficher les projets de manière dynamique.

## Structure des Fichiers

```
portfolio/
└──  app/
    ├── components/
    │   └── ProjectCard.tsx    # Composant d'affichage d'un projet
    ├── types/
    │   └── Project.ts         # Définition des types TypeScript
    └── data/
         └── projects.ts            # Données des projets
```

## Détails des Fichiers

### Project.ts

**Emplacement**: `/app/types/Project.ts`

Ce fichier définit la structure de données d'un projet en utilisant TypeScript.

```typescript
export interface Project {
    id: string;           // Identifiant unique du projet
    img: string;          // URL de l'image du projet
    name: string;         // Nom du projet
    description: string;  // Description courte
    technologies: string[]; // Tableau des technologies utilisées
    codeLink?: string;    // Lien vers le code source (optionnel)
    liveLink?: string;    // Lien vers la démo (optionnel)
}
```

**Points clés**:

- Définit la structure de données d'un projet
- Utilise des types optionnels (`?`) pour les champs non obligatoires
- Assure la cohérence des données dans toute l'application

### projects.ts

**Emplacement**: `app/data/projects.ts`

Ce fichier contient les données des projets à afficher.

```typescript
import { Project } from "@/app/types/Project";

export const projects: Project[] = [
    {
        id: "forums",
        img: "/images/forums.jpg",
        name: "Forums de Discussion",
        description: "Plateforme de discussion avec système de threads et réponses",
        technologies: ["EJS", "Node.js", "PostgreSQL"],
        codeLink: "https://github.com/...",
        liveLink: "https://forums-demo.com"
    },
    // Plus de projets...
];
```

**Points clés**:

- Importe le type `Project` pour assurer la cohérence
- Exporte un tableau d'objets respectant l'interface `Project`
- Peut être facilement étendu avec de nouveaux projets

### ProjectCard.tsx

**Emplacement**: `/app/components/ProjectCard.tsx`

Ce composant React affiche un projet sous forme de carte interactive.

```tsx
import Image from "next/image";
import type { Project } from "@/app/types/Project";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-800">
            {/* Image du projet */}
            <div className="relative h-48">
                <Image
                    src={project.img}
                    alt={project.name}
                    fill
                    className="object-cover"
                />
            </div>
          
            {/* Contenu de la carte */}
            <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">{project.name}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
              
                {/* Badges des technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                            {tech}
                        </span>
                    ))}
                </div>
              
                {/* Boutons d'action */}
                <div className="flex space-x-4">
                    {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                           className="text-blue-400 hover:text-blue-300">
                            Voir la démo
                        </a>
                    )}
                    {project.codeLink && (
                        <a href={project.codeLink} target="_blank" rel="noopener noreferrer"
                           className="text-gray-400 hover:text-white">
                            Code source
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
```

**Points clés**:

- Reçoit un objet `project` comme prop
- Affiche une carte avec image, titre, description et technologies
- Inclut des liens conditionnels vers la démo et le code source
- Utilise Tailwind CSS pour le style

## Comment Ils Fonctionnent Ensemble

1. **Définition des Types** (`Project.ts`):

   - Définit la structure des données
   - Assure la cohérence dans toute l'application
2. **Stockage des Données** (`projects.ts`):

   - Importe le type `Project`
   - Fournit les données concrètes des projets
   - Peut être facilement mis à jour
3. **Affichage** (`ProjectCard.tsx`):

   - Importe le type `Project` pour le typage
   - Reçoit les données d'un projet
   - Affiche une belle carte interactive

## Exemple d'Utilisation

```tsx
// Dans une page Next.js
import { projects } from '@/data/projects';
import ProjectCard from '@/app/components/ProjectCard';

export default function ProjectsPage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
            {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
}
```

## Bonnes Pratiques

1. **Typage Fort**:

   - Toujours importer et utiliser le type `Project`
   - Éviter les types `any`
2. **Séparation des Préoccupations**:

   - Garder les données séparées des composants
   - Séparer la logique de l'affichage
3. **Accessibilité**:

   - Toujours fournir un texte alternatif pour les images
   - Utiliser des balises sémantiques
4. **Performance**:

   - Utiliser le composant `Image` de Next.js pour l'optimisation
   - Charger uniquement les données nécessaires
5. **Maintenabilité**:

   - Nommer clairement les variables et fonctions
   - Commenter le code complexe
   - Garder les composants petits et focalisés
