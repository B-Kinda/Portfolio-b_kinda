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
## 🚀 Optimisation avec Index et Déclencheurs

### Création d'Index pour l'Optimisation

```sql
-- Création d'un index pour accélérer les recherches par nom
CREATE INDEX idx_projects_name ON projects(name);
```

**Fonctionnement** :
- Crée une structure de données B-tree (arbre équilibré) qui mappe chaque nom de projet à son emplacement physique dans la table
- Réduit la complexité des recherches de O(n) à O(log n)
- Particulièrement utile pour les colonnes fréquemment utilisées dans les clauses WHERE

**Avantages** :
- Améliore les performances des requêtes de recherche
- Accélère l'affichage des listes de projets
- Essentiel pour les fonctionnalités de recherche en temps réel

### Gestion Automatique des Dates avec les Déclencheurs

#### 1. Fonction de Mise à Jour Automatique

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';
```

**Fonctionnement** :

- `CREATE OR REPLACE FUNCTION` : Crée ou remplace une fonction stockée
- `RETURNS TRIGGER` : Indique que cette fonction est conçue pour être utilisée avec un déclencheur
- `NEW` : Variable spéciale contenant la nouvelle version de la ligne en cours de modification
- `NOW()` : Fonction qui retourne la date et l'heure actuelles
- `END` : Délimite la fin du bloc de code de la fonction
- `$$` : Délimiteurs qui encadrent le corps de la fonction
- `language 'plpgsql'` : Spécifie le langage de programmation utilisé pour écrire la fonction

#### 2. Création du Déclencheur

```sql
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
```

**Fonctionnement** :

- `BEFORE UPDATE` : S'exécute avant que la mise à jour ne soit appliquée
- `FOR EACH ROW` : Le déclencheur s'exécute une fois pour chaque ligne modifiée
- La fonction `update_updated_at_column()` est automatiquement appelée avant chaque mise à jour

**Exemple d'utilisation** :

```sql
-- Avant la mise à jour
-- | id | name          | created_at          | updated_at          |
-- |----|---------------|---------------------|---------------------|
-- | 1  | GamerChallenge| 2025-01-01 10:00:00 | 2025-01-01 10:00:00 |

UPDATE projects SET name = 'GamerChallenge V2' WHERE id = 1;

-- Après la mise à jour
-- | id | name              | created_at          | updated_at          |
-- |----|-------------------|---------------------|---------------------|
-- | 1  | GamerChallenge V2 | 2025-01-01 10:00:00 | 2025-11-28 10:30:00 | 
--                                                              ↑
--                                                   Mis à jour automatiquement
```

## 🔑 Comprendre les UUID

### Qu'est-ce qu'un UUID ?

Un **UUID (Universally Unique IDentifier)** est un identifiant unique de 128 bits, généralement représenté par 32 chiffres hexadécimaux séparés par des tirets, comme ceci :
```
123e4567-e89b-12d3-a456-426614174000
```

### Pourquoi utiliser un UUID dans votre portfolio ?

1. **Unicité garantie** : La probabilité de générer deux fois le même UUID est extrêmement faible.
2. **Sécurité** : Contrairement aux IDs auto-incrémentés, ils ne révèlent pas d'informations sur le nombre de projets.
3. **Génération côté client** : Peut être généré avant l'insertion en base.
4. **Flexibilité** : Permet de fusionner des données de différentes sources sans conflits d'ID.

### Comment utiliser les UUID dans votre projet

1. **Activer l'extension** (si ce n'est pas déjà fait) :
   ```sql
   CREATE EXTENSION IF NOT EXISTS "pgcrypto";
   ```

2. **Dans vos requêtes SQL** :
   ```sql
   -- Insertion avec génération automatique
   INSERT INTO projects (name, description, img, technologies)
   VALUES ('Nouveau Projet', 'Description', '/images/projet.jpg', '{"React", "Node.js"}');
   
   -- Insertion avec UUID spécifique
   INSERT INTO projects (id, name, description)
   VALUES ('550e8400-e29b-41d4-a716-446655440000', 'Projet Spécifique', 'Description');
   ```

3. **Avec Prisma** :
   ```prisma
   model Project {
     id        String   @id @default(uuid())
     name      String
     // autres champs...
   }
   ```

4. **Générer un UUID en TypeScript** :
   ```bash
   npm install uuid
   npm install --save-dev @types/uuid
   ```
   
   ```typescript
   import { v4 as uuidv4 } from 'uuid';
   
   // Générer un nouvel UUID
   const projectId = uuidv4();
   console.log(projectId); // ex: '110ec58a-a0f2-4ac4-8393-c866d813b8d1'
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


**Avantages** :
- Maintient automatiquement à jour les horodatages
- Garantit la cohérence des données
- Réduit les erreurs humaines
- Facilite le suivi des modifications

## 🏆 Conclusion

PostgreSQL est un choix excellent pour votre portfolio, offrant un équilibre parfait entre facilité d'utilisation et fonctionnalités avancées. En le couplant avec Next.js et Prisma, vous disposez d'une stack moderne et performante pour gérer vos projets et compétences professionnelles.

N'hésitez pas à explorer les fonctionnalités avancées comme les vues matérialisées, les fonctions stockées et les déclencheurs pour optimiser davantage votre application.
