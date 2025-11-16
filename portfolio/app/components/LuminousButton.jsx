"use client";
import Link from "next/link";
import { useState } from "react";

export default function LuminousButton() {
	// 1. Définition de l'état (Hook useState)
	// L'état 'isLit' est un booléen, initialisé à false (éteint).
	// TypeScript infère automatiquement le type 'boolean' [2].
	const [isLit, setIsLit] = useState(false);
	// 2. Gestionnaire d'événement (Event Handler)
	// Cette fonction est appelée lors du clic sur le bouton.
	const handleClick = () => {
		setIsLit(!isLit);
	};
	// 3. Classes CSS
	// On utilise des classes Tailwind pour créer un bouton avec un effet de lumière.
	const buttonClasses = `px-8 py-3 font-bold rounded-lg transition-all duration-300 ${isLit ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`;
	// 4. Retour du composant
	return (
		<Link href="#events">
			<button type="button" onClick={handleClick} className={buttonClasses}>
				{isLit ? "mode lumineux Activé" : "Explorez mes Projets"}
			</button>
		</Link>
	);
}
