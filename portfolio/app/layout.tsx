// layout.tsx sert de base à tous les autres fichiers
// Pour un affichage sur toutes les pages
import Navbar from "./components/NavBar";
import type { NavItem } from "./types/NavItems";

const portfolioLinks: NavItem[] = [
	{
		label: "Accueil",
		href: "/",
	},
	{
		label: "A propos",
		href: "/about",
	},
	{
		label: "Contact",
		href: "/contact",
	},
];
export default function RootLayout({
	children, // <- Les enfants qui seront rendus à l'intérieur
}: {
	children: React.ReactNode; // <- Type qui dit "peut recevoir n'importe quel contenu React"
}) {
	return (
		<html lang="fr">
			<body>
				{/* Le compilateur TypeScript vérifie ici que vous passez bien un tableau de NavItem */}
				<Navbar
					links={portfolioLinks}
					welcomeMessage="Bienvenue sur mon portfolio"
				/>
				{children} {/* Ici on affiche le contenu spécifique à chaque page */}
			</body>
		</html>
	);
}
