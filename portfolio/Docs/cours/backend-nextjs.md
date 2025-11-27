# 🚀 Cours Complet sur le Backend avec Next.js 14

## Introduction

Bienvenue dans ce cours complet sur le développement backend avec Next.js 14 ! Ce document couvrira tout ce dont vous avez besoin pour créer un backend robuste pour votre portfolio.

## 📚 Table des Matières

1. [Architecture d'Application Next.js](#-architecture-nextjs)
2. [Routes API avec App Router](#-routes-api)
3. [Gestion des Données](#-gestion-des-données)
4. [Sécurité](#-sécurité)
5. [Déploiement](#-déploiement)
6. [Projet Pratique](#-projet-pratique-mise-en-œuvre)

## 🏗️ Architecture Next.js

### Structure des dossiers recommandée

```
app/
├── api/                 # Routes API
│   └── projects/        # Endpoints pour les projets
│       └── route.ts     # Gestion des requêtes
├── lib/                 # Utilitaires partagés
│   └── db.ts            # Connexion à la base de données
└── types/               # Types TypeScript
```

## 🔄 Routes API

### Création d'une Route API

Voici comment créer un endpoint pour gérer les projets :

```typescript
// app/api/projects/route.ts
import { NextResponse } from 'next/server';
import { projects } from '@/data/projects';

// GET /api/projects
export async function GET() {
  return NextResponse.json(projects);
}

// POST /api/projects
export async function POST(request: Request) {
  const newProject = await request.json();
  // Validation et traitement...
  return NextResponse.json(newProject, { status: 201 });
}
```

### Méthodes HTTP supportées

- `GET` : Récupérer des ressources
- `POST` : Créer une nouvelle ressource
- `PUT`/`PATCH` : Mettre à jour une ressource
- `DELETE` : Supprimer une ressource

## 🗃️ Gestion des Données

### Configuration de Prisma

1. **Installation** :

```bash
npm install @prisma/client
npx prisma init
```

2. **Schéma Prisma** :

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Project {
  id          String   @id @default(cuid())
  title       String
  description String
  imageUrl    String
  technologies String[]
  githubUrl   String?
  liveUrl     String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

3. **Client Prisma** :

```typescript
// lib/db.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

## 🔒 Sécurité

### Validation des Données avec Zod

```typescript
import { z } from 'zod';

const projectSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10),
  technologies: z.array(z.string()),
  imageUrl: z.string().url(),
  githubUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
});

// Utilisation dans une route API
const validation = projectSchema.safeParse(await request.json());
if (!validation.success) {
  return NextResponse.json(validation.error.issues, { status: 400 });
}
```

### Protection des routes

```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json(
      { error: 'Non autorisé' },
      { status: 401 }
    );
  }
  
  // Suite du traitement...
}
```

## 🚀 Déploiement

### Configuration pour Production

1. **Variables d'environnement** :
   Créez un fichier `.env.local` :
   ```
   DATABASE_URL="votre-url-de-connexion"
   NEXTAUTH_SECRET="votre-secret-tres-long"
   NEXTAUTH_URL="http://localhost:3000"
   NODE_ENV="production"
   ```

2. **Build pour production** :
   ```bash
   npm run build
   npm start
   ```

## 🎓 Projet Pratique : Mise en Œuvre

### 1. Modèle de Données

```typescript
// types/project.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### 2. Service de Données

```typescript
// app/lib/projectService.ts
import { prisma } from './db';
import { Project } from '@/types/project';

export async function getProjects(): Promise<Project[]> {
  return await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function getProjectById(id: string): Promise<Project | null> {
  return await prisma.project.findUnique({
    where: { id },
  });
}

export async function createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
  return await prisma.project.create({
    data: projectData,
  });
}

export async function updateProject(id: string, projectData: Partial<Project>): Promise<Project> {
  return await prisma.project.update({
    where: { id },
    data: projectData,
  });
}

export async function deleteProject(id: string): Promise<void> {
  await prisma.project.delete({
    where: { id },
  });
}
```

### 3. Mise à jour du Composant ProjectCard

```typescript
// app/components/ProjectCard.tsx
'use client';

import { Project } from '@/types/project';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

export default function ProjectCard({ project, onDelete, isAdmin = false }: ProjectCardProps) {
  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {isAdmin && (
        <div className="absolute top-2 right-2 z-10 flex space-x-2">
          <Link 
            href={`/admin/projects/edit/${project.id}`}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            ✏️
          </Link>
          <button
            onClick={() => onDelete?.(project.id)}
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            aria-label="Supprimer le projet"
          >
            🗑️
          </button>
        </div>
      )}
      
      <div className="relative h-48 w-full">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{project.title}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span 
              key={tech} 
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex space-x-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Voir sur GitHub"
            >
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          )}
          
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
            >
              Voir le projet →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
```

## 🛠️ Bonnes Pratiques

1. **Validation** : Toujours valider les entrées utilisateur
2. **Gestion des erreurs** : Intercepter et gérer les erreurs de manière appropriée
3. **Sécurité** : Ne jamais exposer d'informations sensibles
4. **Performance** : Mettre en place du cache quand c'est pertinent
5. **Documentation** : Documenter vos API avec Swagger/OpenAPI

## 📚 Ressources Supplémentaires

1. [Documentation Next.js](https://nextjs.org/docs)
2. [Documentation Prisma](https://www.prisma.io/docs)
3. [Documentation TypeScript](https://www.typescriptlang.org/docs/)
4. [Documentation Zod](https://zod.dev/)
5. [NextAuth.js Documentation](https://next-auth.js.org/)

## 🎯 Prochaines Étapes

1. Implémenter l'authentification avec NextAuth.js
2. Ajouter des tests unitaires et d'intégration
3. Mettre en place un système de cache avec Redis
4. Optimiser les performances avec ISR (Incremental Static Regeneration)
5. Configurer le monitoring et les logs

---

Ce cours est conçu pour vous donner une base solide dans le développement backend avec Next.js. N'hésitez pas à l'enrichir avec vos propres découvertes et expériences !
