"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { ButtonProps } from "../types/ButtonProps";

export default function LuminousButton({
	text = "Explorer mes projets",
	activeText = "Mes projets",
	isActive: externalIsActive = false,
	onToggle,
	href = "/projects",
	className = "",
}: ButtonProps) {
	const [isLit, setIsLit] = useState(false);
	const [isActive, setIsActive] = useState(externalIsActive);

	// Mise à jour de l'état interne si la prop externe change
	useEffect(() => {
		setIsActive(externalIsActive);
	}, [externalIsActive]);

	// Gestion du montage côté client
	useEffect(() => {
		setIsLit(true);
	}, []);

	// Gestion du toggle
	const handleClick = () => {
		const newState = !isActive;
		setIsActive(newState);
		onToggle?.(newState);
	};

	if (!isLit) {
		return (
			<div
				className={`px-8 py-3 rounded-lg bg-gray-200 animate-pulse ${className}`}
			/>
		);
	}
	const buttonClasses = `px-8 py-3 font-bold rounded-lg transition-all duration-300 
    ${
			isActive
				? "bg-blue-500 text-white shadow-lg shadow-blue-500/50"
				: "bg-gray-700 text-gray-300 hover:bg-gray-600"
		}`;

	const buttonContent = (
		<button type="button" onClick={handleClick} className={buttonClasses}>
			{isActive ? activeText : text}
		</button>
	);
	return href ? (
		<Link href={href} passHref>
			{buttonContent}
		</Link>
	) : (
		{ buttonContent }
	);
}
