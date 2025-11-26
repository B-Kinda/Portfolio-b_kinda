export interface Project {
	id: number;
	img: string;
	name: string;
	description: string;
	technologies: string;
	codeLink?: string;
	liveLink?: string;
}
export const projects: Project[] = [
	{
		id: 1,
		img: "",
		name: "GamerChallenge",
		description: "Projet de fin de formation",
		technologies: "EJS, Node.js, PostgreSQL",
		codeLink: "https://github.com/B-Kinda/GamerChallenges",
		liveLink: "",
	},
	{
		id: 2,
		img: "",
		name: "MForMums",
		description: "Projet client Freelance",
		technologies: "EJS, Node.js, PostgreSQL",
		codeLink: "https://github.com/B-Kinda/M-FOR-MUMS",
		liveLink: "",
	},
	{
		id: 3,
		img: "",
		name: "Site Outils",
		description: "Projet client Freelance",
		technologies: "HTML, CSS, JS",
		codeLink: "https://github.com/B-Kinda/SITE-OUTILS",
		liveLink: "",
	},
];
