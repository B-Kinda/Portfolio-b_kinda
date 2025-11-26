import { Project } from "@/app/types/Project";

export const projects: Project[] = [
	{
		id: "forums",
		img: "/images/projets/home_Page.png",
		name: "GamerChallenge",
		description: "Projet de fin de formation",
		technologies: ["EJS", "Node.js", "PostgreSQL"],
		codeLink: "https://github.com/B-Kinda/GamerChallenges",
		liveLink: "",
	},
	{
		id: "vitrine",
		img: "/images/projets/MForMum.png",
		name: "MForMums",
		description: "Projet client Freelance",
		technologies: ["EJS", "Node.js", "PostgreSQL"],
		codeLink: "https://github.com/B-Kinda/M-FOR-MUMS",
		liveLink: "",
	},
	{
		id: "tools",
		img: "/images/projets/signUp.png",
		name: "Site Outils",
		description: "Projet client Freelance",
		technologies: ["HTML", "CSS", "JS"],
		codeLink: "https://github.com/B-Kinda/SITE-OUTILS",
		liveLink: "",
	},
];
