// --- Types externes (idéalement dans un fichier dédié) ---
export type NavItem = {
	label: string;
	href: string;
	authRequired?: boolean;
};
export interface NavbarProps {
	links: NavItem[];
	welcomeMessage?: string;
}
