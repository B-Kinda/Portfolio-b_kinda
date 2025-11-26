// -------------------- Types externes projet -------------------
export interface Project {
	id: string;
	img: string;
	name: string;
	description: string;
	technologies: string[];
	codeLink?: string;
	liveLink?: string;
}
