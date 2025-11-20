"use client";
import Link from "next/link";
import { useState } from "react";

export default function LuminousButton() {
	const [isLit, setIsLit] = useState(false);
	const handleClick = (e) => {
		console.log("Bouton cliqué - isLit avant:", isLit);
		e.preventDefault();
		setIsLit(!isLit);
		console.log("isLit après setState:", !isLit);
	};
	const buttonClasses = `px-8 py-3 font-bold rounded-lg transition-all duration-300 
    ${
			isLit
				? "bg-blue-500 text-white shadow-lg shadow-blue-500/50"
				: "bg-gray-700 text-gray-300 hover:bg-gray-600"
		}`;
	console.log("Rendu - classes appliquées:", buttonClasses);
	return (
		<Link href="#" passHref>
			<button type="button" onClick={handleClick} className={buttonClasses}>
				{isLit ? "Challenges Techniques" : "Voir les Challenges Techniques"}
			</button>
		</Link>
	);
}
