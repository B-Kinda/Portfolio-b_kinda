# 🚀 Cours Complet sur le Backend avec Next.js 16.0.1

## 📚 Lexique pour Débutants

### Qu'est-ce que Prisma ?

Prisma est un outil qui facilite la communication entre votre application et votre base de données. C'est comme un traducteur qui permet à votre code JavaScript/TypeScript de parler facilement avec votre base de données.

**En termes simples** : Imaginez que votre application est un client dans un restaurant. La base de données est la cuisine, et Prisma est le serveur qui prend votre commande (requête) et vous apporte votre plat (données).

**Pourquoi utiliser Prisma ?**
- Écriture de requêtes en JavaScript/TypeScript (pas besoin de SQL pur)
- Vérification des types pour éviter les erreurs
- Gestion des connexions à la base de données
- Outils de migration pour mettre à jour la structure de votre base

### Qu'est-ce que Zod ?

Zod est une bibliothèque qui vous aide à valider que les données que vous recevez sont bien ce que vous attendez. C'est comme un garde du corps qui vérifie les identifiants à l'entrée d'une boîte de nuit.

**Exemple simple :**
```typescript
// Définition d'un schéma de validation
const userSchema = z.object({
  email: z.string().email(),
  age: z.number().min(18, "Doit avoir au moins 18 ans")
});

// Validation
const result = userSchema.safeParse({
  email: "test@example.com",
  age: 20
});

if (!result.success) {
  console.error("Données invalides !", result.error);
}
```

**Pourquoi utiliser Zod ?**
- Validation des données utilisateur
- Vérification des types à l'exécution
- Messages d'erreur clairs
- Facile à utiliser avec TypeScript

### Qu'est-ce qu'un Endpoint ?

Un endpoint est une adresse (URL) à laquelle votre application peut envoyer des requêtes pour effectuer des actions spécifiques. C'est comme les différents services d'un restaurant :

- `GET /menu` → Voir le menu (récupérer des données)
- `POST /commande` → Passer une commande (créer des données)
- `PUT /profil` → Mettre à jour son profil (modifier des données)
- `DELETE /compte` → Supprimer son compte (supprimer des données)

**Exemple concret :**
- URL : `https://api.monportfolio.com/projets`
- Méthode : `GET`
- Réponse : Liste de tous les projets

**Pourquoi c'est important ?**
- Structure claire de l'API
- Séparation des préoccupations
- Facilité de maintenance

### Qu'est-ce que le CRUD ?

**CRUD** est un acronyme qui représente les quatre opérations fondamentales des applications de base de données :

- **C**reate (Créer) - Ajouter de nouvelles données
- **R**ead (Lire) - Récupérer des données
- **U**pdate (Mettre à jour) - Modifier des données existantes
- **D**elete (Supprimer) - Supprimer des données

**Exemple avec une liste de tâches :**
- **Créer** : Ajouter une nouvelle tâche
- **Lire** : Afficher la liste des tâches
- **Mettre à jour** : Cocher une tâche comme terminée
- **Supprimer** : Enlever une tâche de la liste

### `request: Request` vs `req, res`

#### `request: Request` (Next.js)
- Style moderne utilisant les standards du web
- Retourne un objet `Response` natif
- Asynchrone par défaut
- Utilisé avec l'App Router de Next.js

#### `req, res` (Node.js/Express)
- Style plus traditionnel
- Utilise des callbacks
- API spécifique à Node.js/Express
- Plus verbeux pour certaines opérations

**Exemple comparatif :**

```typescript
// Next.js (App Router) - Style moderne
export async function GET(request: Request) {
  const data = await request.json();
  return new Response(JSON.stringify({ message: "Bonjour" }), {
    headers: { "Content-Type": "application/json" }
  });
}

// Node.js/Express - Style classique
app.get('/api/exemple', (req, res) => {
  const data = req.body;
  res.json({ message: "Bonjour" });
});
```

**Quand utiliser lequel ?**
- Pour les nouveaux projets Next.js (13+), utilisez `request: Request`
- Pour les anciens projets ou avec Express, utilisez `req, res`

## Introduction

Bienvenue dans ce cours complet sur le développement backend avec Next.js 16.0.1 ! Ce document est spécialement adapté à votre projet et couvrira tout ce dont vous avez besoin pour créer un backend robuste pour votre portfolio en utilisant les versions précises des dépendances de votre projet.

## 📚 Table des Matières

1. [Architecture d'Application Next.js](#-architecture-nextjs)
2. [Routes API avec App Router](#-routes-api)
3. [Gestion des Données](#-gestion-des-données)
4. [Sécurité](#-sécurité)
5. [Déploiement](#-déploiement)
6. [Projet Pratique](#-projet-pratique-mise-en-œuvre)

## 🏗️ Architecture Next.js 16.0.1

### Structure des dossiers recommandée pour Next.js 16

```typescript
// Structure de base pour Next.js 16.0.1
app/
├── api/                           # Routes API (App Router)
│   └── projects/            
│       ├── route.ts               # Gestion des requêtes (GET, POST, etc.)
│       └── [fonction].route.ts    # Routes dynamiques par fonction
├── lib/                           # Utilitaires partagés
│   ├── db.ts                      # Connexion à la base de données
│   └── utils/                     # Fonctions utilitaires
├── types/                         # Types TypeScript
│   └── index.ts                   # Export des types
└── components/                    # Composants partagés
    └── ui/                        # Composants d'interface utilisateur
```

### Points clés de Next.js 16.0.1 :
- Prise en charge complète de React 19
- Amélioration des performances du routeur App
- Meilleure gestion des métadonnées
- Support natif des Server Actions

## 🔄 Routes API avec PostgreSQL

### Exemple de CRUD complet avec PostgreSQL

```typescript
// app/api/projects/route.ts
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET /api/projects
export async function GET() {
  try {
    const result = await pool.query(
      'SELECT * FROM projects ORDER BY created_at DESC'
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// POST /api/projects
export async function POST(request: Request) {
  try {
    const { title, description, imageUrl, technologies } = await request.json();
    
    const result = await pool.query(
      'INSERT INTO projects (title, description, image_url, technologies) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, imageUrl, technologies]
    );
    
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du projet:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du projet' },
      { status: 500 }
    );
  }
}
```

### Exemple de route dynamique

```typescript
// app/api/projects/[id]/route.ts
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result = await pool.query(
      'SELECT * FROM projects WHERE id = $1',
      [params.id]
    );
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération du projet:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
```

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

## 🛠️ Validation des Données avec Zod

### Schéma de validation pour les projets

Voici comment nous pouvons utiliser Zod pour valider les données des projets :

```typescript
// lib/validations/project.ts
import { z } from 'zod';

export const projectSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(3, 'Le nom doit contenir au moins 3 caractères'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  technologies: z.array(z.string()).nonempty('Au moins une technologie est requise'),
  img: z.string().url('URL d\'image invalide'),
  codeLink: z.string().url('URL GitHub invalide').optional(),
  liveLink: z.string().url('URL de démo invalide').optional()
});

export const validateProject = (data: unknown) => {
  return projectSchema.safeParse(data);
};
```

### Utilisation dans une route API

Voici comment utiliser ce schéma dans une route API pour valider les données avant de les enregistrer :

```typescript
// app/api/projects/route.ts
import { NextResponse } from 'next/server';
import { validateProject } from '@/lib/validations/project';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const projects = await prisma.project.findMany();
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des projets' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const validation = validateProject(data);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validation.error.issues },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: validation.data
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du projet :', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du projet' },
      { status: 500 }
    );
  }
}
```

## 🛠️ ORM pour Next.js : Prisma vs Sequelize

### Pourquoi utiliser un ORM ?

Un ORM (Object-Relational Mapping) est un outil qui fait le pont entre votre base de données relationnelle et votre code orienté objet. Voici pourquoi c'est utile :

- **Productivité** : Moins de code à écrire
- **Sécurité** : Protection contre les injections SQL
- **Portabilité** : Changement de base de données plus facile
- **Typage fort** : Meilleure détection des erreurs avec TypeScript

## 🔄 Utilisation de Prisma (Recommandé)

### Configuration initiale

1. Installation :
```bash
npm install @prisma/client
npm install -D prisma
npx prisma init
```

2. Définition du schéma (`prisma/schema.prisma`) :
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Project {
  id            String   @id @default(uuid())
  title         String
  description   String
  imageUrl      String   @map("image_url")
  technologies  String[]
  createdAt     DateTime @default(now()) @map("created_at")
  updatedAt     DateTime @updatedAt @map("updated_at")

  @@map("projects")
}
```

### Exemple d'API avec Prisma

```typescript
// app/api/projects/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST /api/projects
export async function POST(request: Request) {
  try {
    const { title, description, imageUrl, technologies } = await request.json();
    
    const project = await prisma.project.create({
      data: {
        title,
        description,
        imageUrl,
        technologies
      }
    });
    
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du projet:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du projet' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
```

## 🔄 Utilisation de Sequelize

### Configuration initiale

1. Installation :
```bash
npm install sequelize pg pg-hstore
npm install -D @types/sequelize
```

2. Configuration de la connexion (`lib/db.ts`) :
```typescript
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE_NAME!,
  process.env.DATABASE_USER!,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

export default sequelize;
```

### Exemple d'API avec Sequelize

```typescript
// app/api/projects/route.ts
import { NextResponse } from 'next/server';
import { DataTypes, Model } from 'sequelize';
import sequelize from '@/lib/db';

// Définition du modèle
class Project extends Model {
  public id!: string;
  public title!: string;
  public description!: string;
  public imageUrl!: string;
  public technologies!: string[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Project.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.TEXT,
  imageUrl: {
    type: DataTypes.STRING,
    field: 'image_url'
  },
  technologies: DataTypes.ARRAY(DataTypes.STRING)
}, {
  sequelize,
  modelName: 'Project',
  tableName: 'projects',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// GET /api/projects
export async function GET() {
  try {
    await sequelize.authenticate();
    const projects = await Project.findAll({
      order: [['created_at', 'DESC']]
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// POST /api/projects
export async function POST(request: Request) {
  try {
    const { title, description, imageUrl, technologies } = await request.json();
    
    await sequelize.authenticate();
    const project = await Project.create({
      title,
      description,
      imageUrl,
      technologies
    });
    
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du projet:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du projet' },
      { status: 500 }
    );
  }
}
```

## 🔍 Comparaison Prisma vs Sequelize

| Critère          | Prisma | Sequelize |
|------------------|--------|-----------|
| Facilité d'utilisation | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Performance | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Typage TypeScript | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Documentation | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Communauté | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Migration | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Relations | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Requêtes complexes | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Intégration Next.js | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

## 🏆 Recommandation

Pour un nouveau projet Next.js, nous recommandons fortement **Prisma** pour :
- Sa facilité d'utilisation
- Son excellente intégration avec TypeScript
- Son système de migration intégré
- Sa documentation claire et moderne

## 🗃️ Gestion des Données avec PostgreSQL

### Modèle de données du projet

Notre application utilise une structure de données bien définie pour les projets. Voici l'interface TypeScript qui définit la structure d'un projet :

```typescript
// app/types/Project.ts
export interface Project {
  id: string;
  img: string;
  name: string;
  description: string;
  technologies: string[];
  codeLink?: string;
  liveLink?: string;
}
```

**Exemple de données de projet :**
```typescript
// data/projects.ts
const projects: Project[] = [
  {
    id: "forums",
    img: "/images/projets/home_Page.png",
    name: "GamerChallenge",
    description: "Projet de fin de formation",
    technologies: ["EJS", "Node.js", "PostgreSQL"],
    codeLink: "https://github.com/B-Kinda/GamerChallenges"
  },
  // ... autres projets
];
```

### Pourquoi PostgreSQL avec Next.js ?

PostgreSQL est un choix idéal pour les applications Next.js car :
- Gestion robuste des transactions
- Support natif du JSONB pour des données semi-structurées
- Extensions puissantes (PostGIS, Full-Text Search, etc.)
- Compatible avec les Server Components et les API Routes

### Configuration de PostgreSQL

### Configuration de Prisma

1. **Installation de Prisma**

```bash
# Installation des dépendances nécessaires
npm install @prisma/client
npm install -D prisma

# Initialisation de Prisma
npx prisma init

# Générer le client Prisma (à exécuter après chaque modification du schéma)
npx prisma generate
```

### Configuration de la connexion PostgreSQL

Créez un fichier `lib/db.ts` pour gérer la connexion :

```typescript
import { Pool } from 'pg';

// Configuration du pool de connexions
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
  ssl: process.env.NODE_ENV === 'production' 
    ? { rejectUnauthorized: false } 
    : false
});

// Test de connexion
pool.on('connect', () => {
  console.log('Connecté à la base de données PostgreSQL');
});

export default pool;
```

### Configuration de Prisma avec PostgreSQL

Assurez-vous d'avoir ces dépendances dans votre `package.json` :

```json
{
  "dependencies": {
    "@prisma/client": "^5.0.0"
  },
  "devDependencies": {
    "prisma": "^5.0.0"
  }
}
```

2. **Schéma Prisma** :

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
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

## 🚀 Déploiement avec Next.js 16

### Configuration pour Production avec PostgreSQL

1. **Base de données en production** :
   - Utilisez un service géré comme Supabase, Neon, ou Amazon RDS
   - Configurez un pool de connexions adapté à votre charge

2. **Migrations** :
   ```bash
   # Créer une nouvelle migration
   npx prisma migrate dev --name init
   
   # Appliquer les migrations en production
   npx prisma migrate deploy
   ```

3. **Optimisation des performances** :
   - Utilisez des index pour les requêtes fréquentes
   - Mettez en place du caching avec Redis si nécessaire
   - Utilisez des vues matérialisées pour les requêtes complexes

1. **Fichier .env.local** :
   Créez un fichier `.env.local` à la racine de votre projet :
   ```env
   # Base de données
   DATABASE_URL="votre-url-de-connexion"
   
   # Authentification (si utilisée)
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="générer-une-chaîne-sécurisée"
   
   # Environnement
   NODE_ENV="production"
   
   # Configuration Next.js
   NEXT_PUBLIC_SITE_URL="https://votresite.com"
   ```

2. **Scripts de build** :
   Votre `package.json` contient déjà les scripts nécessaires :
   ```json
   {
     "scripts": {
       "dev": "next dev --webpack",
       "build": "next build --webpack",
       "start": "next start",
       "lint": "eslint"
     }
   }
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

## 🛠️ Bonnes Pratiques avec PostgreSQL

1. **Sécurité**
   - Utilisez des requêtes paramétrées pour éviter les injections SQL
   - Limitez les permissions de l'utilisateur de la base de données
   - Activez SSL pour les connexions en production

2. **Performances**
   ```sql
   -- Exemple de création d'index
   CREATE INDEX idx_projects_technologies ON projects USING GIN(technologies);
   
   -- Pour les recherches plein texte
   CREATE EXTENSION IF NOT EXISTS pg_trgm;
   CREATE INDEX idx_projects_title_trgm ON projects USING GIN(title gin_trgm_ops);
   ```

3. **Maintenance**
   - Planifiez des sauvegardes régulières
   - Surveillez les performances avec `pg_stat_statements`
   - Utilisez `EXPLAIN ANALYZE` pour optimiser les requêtes lentes

4. **Extensions utiles**
   - `pgcrypto` pour le chiffrement
   - `uuid-ossp` pour les UUID
   - `pg_stat_statements` pour le monitoring
   - `postgis` pour les données géographiques

1. **Validation** : Toujours valider les entrées utilisateur
2. **Gestion des erreurs** : Intercepter et gérer les erreurs de manière appropriée
3. **Sécurité** : Ne jamais exposer d'informations sensibles
4. **Performance** : Mettre en place du cache quand c'est pertinent
5. **Documentation** : Documenter vos API avec Swagger/OpenAPI

## 📚 Ressources Spécifiques à Next.js 16.0.1

1. [Documentation Next.js 16.0.1](https://nextjs.org/docs/16.0.1)
2. [Guide de migration vers Next.js 16](https://nextjs.org/docs/16.0.1/upgrading)
3. [Documentation Prisma](https://www.prisma.io/docs)
4. [TypeScript avec Next.js](https://nextjs.org/docs/16.0.1/basic-features/typescript)
5. [Framer Motion avec React 19](https://www.framer.com/motion/)
6. [Guide d'optimisation des performances](https://nextjs.org/docs/16.0.1/basic-features/optimizations)
7. [Gestion des métadonnées](https://nextjs.org/docs/16.0.1/app/building-your-application/optimizing/metadata)
8. [API Routes dans Next.js 16](https://nextjs.org/docs/16.0.1/app/building-your-application/routing/route-handlers)

## 🎯 Prochaines Étapes pour Votre Projet

1. **Authentification**
   - Implémenter NextAuth.js v5 (compatible avec Next.js 16)
   - Configurer des fournisseurs d'authentification (Google, GitHub, etc.)
   
2. **Tests**
   - Configurer Jest et React Testing Library
   - Écrire des tests unitaires pour les composants
   - Implémenter des tests d'intégration pour les routes API
   
3. **Optimisation des performances**
   - Mettre en place le chargement différé (lazy loading)
   - Utiliser les Server Components de manière optimale
   - Configurer le cache HTTP
   
4. **Sécurité**
   - Valider toutes les entrées utilisateur
   - Implémenter une protection CSRF
   - Configurer les en-têtes de sécurité
   
5. **Déploiement**
   - Configurer Vercel pour le déploiement
   - Mettre en place des environnements multiples (dev, staging, prod)
   - Configurer les redirections et réécritures d'URL

6. **Améliorations futures**
   - Intégrer un système de commentaires
   - Ajouter un tableau de bord d'administration
   - Mettre en place des webhooks pour le déploiement continu

---

Ce cours est conçu pour vous donner une base solide dans le développement backend avec Next.js. N'hésitez pas à l'enrichir avec vos propres découvertes et expériences !
