# 🐘 Guide Complet de PostgreSQL avec Next.js

## 📚 Introduction à PostgreSQL

PostgreSQL est un système de gestion de base de données relationnelle (SGBDR) open-source avancé, connu pour sa fiabilité, ses fonctionnalités robustes et sa conformité aux standards SQL. Dans ce guide, nous allons explorer comment l'utiliser efficacement avec votre application Next.js.

### Pourquoi PostgreSQL ?

- **Open Source** : Gratuit et bénéficie d'une grande communauté
- **Relationnel** : Gère parfaitement les relations entre les données
- **Extensible** : Supporte les types de données personnalisés
- **ACID** : Garantit l'intégrité des transactions
- **JSON natif** : Stockage et requêtage de données JSON

## 🛠 Installation et Configuration

### Installation de PostgreSQL

1. **Sous macOS (avec Homebrew)** :
   ```bash
   brew install postgresql@14
   brew services start postgresql@14
   ```

2. **Créer un utilisateur et une base de données** :
   ```bash
   createuser -P portfolio_user  # Crée un utilisateur (mot de passe sera demandé)
   createdb -O portfolio_user portfolio_db
   ```

3. **Configuration de l'environnement** :
   Créez un fichier `.env.local` à la racine de votre projet :
   ```
   DATABASE_URL="postgresql://portfolio_user:votre_mot_de_passe@localhost:5432/portfolio_db?schema=public"
   ```

## 🗃 Modélisation des Données pour votre Portfolio

### Schéma de la table `projects`

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  img VARCHAR(255) NOT NULL,
  technologies TEXT[] NOT NULL,
  code_link VARCHAR(255),
  live_link VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Création d'un index pour accélérer les recherches par nom
CREATE INDEX idx_projects_name ON projects(name);

-- Déclencheur pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
```

## 🔌 Connexion à PostgreSQL depuis Next.js

### Utilisation avec Prisma (Recommandé)

1. **Configuration de Prisma** :
   ```bash
   npm install @prisma/client
   npx prisma init
   ```

2. **Schéma Prisma** (`prisma/schema.prisma`) :
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }

   generator client {
     provider = "prisma-client-js"
   }

   model Project {
     id            String   @id @default(uuid())
     name          String
     description   String
     img           String
     technologies  String[]
     codeLink      String?  @map("code_link")
     liveLink      String?  @map("live_link")
     createdAt     DateTime @default(now()) @map("created_at")
     updatedAt     DateTime @updatedAt @map("updated_at")

     @@map("projects")
   }
   ```

3. **Application des migrations** :
   ```bash
   npx prisma migrate dev --name init
   ```

## 📊 Requêtes SQL Essentielles

### 1. Insertion de données

```sql
-- Ajouter un nouveau projet
INSERT INTO projects (name, description, img, technologies, code_link, live_link)
VALUES (
  'GamerChallenge',
  'Projet de fin de formation',
  '/images/projets/home_Page.png',
  ARRAY['EJS', 'Node.js', 'PostgreSQL'],
  'https://github.com/B-Kinda/GamerChallenges',
  ''
);
```

### 2. Requêtes de sélection

```sql
-- Récupérer tous les projets
SELECT * FROM projects ORDER BY created_at DESC;

-- Récupérer un projet par son ID
SELECT * FROM projects WHERE id = 'votre_id';

-- Rechercher des projets par technologie
SELECT * FROM projects WHERE 'Node.js' = ANY(technologies);

-- Compter les projets par technologie
SELECT 
  UNNEST(technologies) AS technology,
  COUNT(*) AS project_count
FROM projects
GROUP BY technology
ORDER BY project_count DESC;
```

### 3. Mise à jour de données

```sql
-- Mettre à jour un projet
UPDATE projects
SET 
  name = 'Nouveau nom',
  description = 'Nouvelle description',
  technologies = ARRAY['React', 'TypeScript', 'Next.js']
WHERE id = 'votre_id';
```

### 4. Suppression de données

```sql
-- Supprimer un projet
DELETE FROM projects WHERE id = 'votre_id';
```

## 🚀 Intégration avec Next.js

### Création d'une API REST

```typescript
// app/api/projects/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/projects
export async function GET() {
  try {
    const projects = await prisma.$queryRaw`
      SELECT * 
      FROM projects 
      ORDER BY created_at DESC
    `;
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
    const { name, description, img, technologies, codeLink, liveLink } = await request.json();
    
    const project = await prisma.$executeRaw`
      INSERT INTO projects (name, description, img, technologies, code_link, live_link)
      VALUES (
        ${name}, 
        ${description}, 
        ${img}, 
        ${technologies}::text[], 
        ${codeLink || null}, 
        ${liveLink || null}
      )
      RETURNING *
    `;
    
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

## 🔒 Bonnes Pratiques de Sécurité

1. **Utilisation des requêtes paramétrées** :
   ```typescript
   // ❌ À éviter
   const query = `SELECT * FROM users WHERE email = '${email}'`;
   
   // ✅ À privilégier
   const query = 'SELECT * FROM users WHERE email = $1';
   const values = [email];
   ```

2. **Gestion des connexions** :
   - Utilisez un pool de connexions
   - Fermez toujours les connexions après utilisation
   - Limitez les privilèges de l'utilisateur de la base de données

3. **Sauvegardes régulières** :
   ```bash
   # Sauvegarde de la base de données
   pg_dump -U username -d dbname -f backup.sql
   
   # Restauration
   psql -U username -d dbname -f backup.sql
   ```

## 🚀 Déploiement avec PostgreSQL

### Options de déploiement

1. **Neon.tech** : PostgreSQL serverless
2. **Supabase** : Backend as a Service avec PostgreSQL
3. **Railway** : Déploiement facile avec un plan gratuit
4. **AWS RDS** : Solution évolutive pour la production

### Configuration pour la production

1. **Variables d'environnement** :
   ```
   DATABASE_URL="postgresql://user:password@host:port/dbname?schema=public&sslmode=require"
   ```

2. **Optimisation des performances** :
   ```sql
   -- Création d'index pour les recherches fréquentes
   CREATE INDEX idx_projects_technologies ON projects USING GIN(technologies);
   
   -- Nettoyage et analyse pour l'optimiseur de requêtes
   VACUUM ANALYZE projects;
   ```

## 🔍 Débogage et Maintenance

### Commandes utiles

```bash
# Se connecter à PostgreSQL
psql -U username -d dbname

# Afficher les connexions actives
SELECT * FROM pg_stat_activity;

# Voir la taille des tables
SELECT 
  table_name, 
  pg_size_pretty(pg_total_relation_size(table_name)) as total_size
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY pg_total_relation_size(table_name) DESC;
```

### Surveillance des performances

```sql
-- Requêtes les plus lentes
SELECT 
  query,
  total_exec_time,
  calls,
  mean_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;
```

## 📚 Ressources Supplémentaires

- [Documentation officielle PostgreSQL](https://www.postgresql.org/docs/)
- [Prisma avec PostgreSQL](https://www.prisma.io/docs/concepts/database-connectors/postgresql)
- [PostgreSQL pour les développeurs Node.js](https://node-postgres.com/)
- [Cours PostgreSQL avancé](https://www.postgresqltutorial.com/)

## 🎓 Exercices Pratiques

1. Créez une table `skills` pour stocker vos compétences techniques
2. Implémentez une relation many-to-many entre `projects` et `skills`
3. Créez une vue pour afficher les statistiques de vos projets par technologie
4. Mettez en place un système de sauvegarde automatique

## 🏆 Conclusion

PostgreSQL est un choix excellent pour votre portfolio, offrant un équilibre parfait entre facilité d'utilisation et fonctionnalités avancées. En le couplant avec Next.js et Prisma, vous disposez d'une stack moderne et performante pour gérer vos projets et compétences professionnelles.

N'hésitez pas à explorer les fonctionnalités avancées comme les vues matérialisées, les fonctions stockées et les déclencheurs pour optimiser davantage votre application.
