# Cours d'Introduction à React et Next.js

## 1. Structure de base d'une application Next.js

### Le fichier `layout.tsx`
- **Rôle** : Composant racine qui enveloppe toutes les pages
- **Particularités** :
  - Contient la structure HTML de base
  - Reçoit automatiquement les pages comme `children`
  - Idéal pour les éléments communs (en-tête, navigation, pied de page)

```tsx
export default function RootLayout({
  children, // Les pages de l'application
}: {
  children: React.ReactNode; // Type qui accepte n'importe quel contenu React
}) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        {children} {/* Contenu des pages */}
      </body>
    </html>
  );
}
```

### Le fichier `page.tsx`
- **Rôle** : Définit le contenu d'une page spécifique
- **Particularités** :
  - Exporte par défaut un composant React
  - S'affiche dans la partie `{children}` du layout

```tsx
export default function Home() {
  return <h1>Bienvenue sur mon site !</h1>;
}
```

## 2. Les composants React

### Création d'un composant
```tsx
// components/Navbar.tsx
import Link from "next/link";

interface NavbarProps {
  links: Array<{ label: string; href: string }>;
  welcomeMessage?: string;
}

export default function Navbar({ links, welcomeMessage }: NavbarProps) {
  return (
    <nav>
      {welcomeMessage && <p>{welcomeMessage}</p>}
      <ul>
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

## 3. Les clés (keys) dans les listes

### Pourquoi utiliser des clés ?
- **Performance** : Aide React à identifier quels éléments ont changé
- **Stabilité** : Maintient l'état des composants entre les rendus
- **Obligatoire** : Une erreur s'affiche si vous oubliez la prop `key`

### Bonne pratique
```tsx
{/* ✅ Bon - Utilisation d'un identifiant unique */}
{items.map(item => (
  <div key={item.id}>{item.name}</div>
))}

{/* ❌ À éviter - Utilisation de l'index comme clé */}
{items.map((item, index) => (
  <div key={index}>{item.name}</div> 
))}
```

## 4. Gestion des types avec TypeScript

### Définition des types
```typescript
// types/NavItems.ts
export type NavItem = {
  label: string;
  href: string;
  authRequired?: boolean; // Le ? signifie que c'est optionnel
};

export interface NavbarProps {
  links: NavItem[];
  welcomeMessage?: string;
}
```

## 5. Structure de dossiers recommandée

```
app/
  components/     # Composants réutilisables
  types/         # Définitions de types TypeScript
  page.tsx       # Page d'accueil
  layout.tsx     # Layout principal
```

## 6. Bonnes pratiques

1. **Composants** : Créez des composants petits et réutilisables
2. **Types** : Utilisez TypeScript pour une meilleure maintenabilité
3. **Clés** : Toujours fournir une clé unique pour les éléments de liste
4. **Dossiers** : Suivez la structure de dossiers de Next.js
5. **Documentation** : Commentez vos composants et types

## 7. Prochaines étapes

- Ajouter du style avec Tailwind CSS
- Créer des pages dynamiques
- Gérer les états avec React Hooks
- Se connecter à une API
- Gérer l'authentification
