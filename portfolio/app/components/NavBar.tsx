import Link from "next/link";
// Importez l'interface ou le type que nous allons créer plus tard.
// import { NavbarProps } from '@/types/component-types'; // Exemple

import type { NavbarProps } from "../types/NavItems";

// Nous allons créer le composant ici.
export default function Navbar({ links, welcomeMessage }: NavbarProps) {
	// Ici, grâce à TypeScript, 'links' est garanti d'être un tableau de NavItem
	console.log(links);
	return (
		<header className="gaming-darker p-4">
			<nav className="flex justify-between items-center">
				{/* Logo */}
				{welcomeMessage && <p>{welcomeMessage}</p>}

				<ul className="flex gap-4">
					{links.map((item) => (
						<li key={item.href}>
							{/* Le key est obligatoire pour les éléments de liste mappés en React */}
							<Link href={item.href}>{item.label}</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}
