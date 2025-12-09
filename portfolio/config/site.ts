export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Next.js + HeroUI",
	description: "Make beautiful websites regardless of your design experience.",
	navItems: [
		{
			label: "Acceuil",
			href: "/",
		},
		{
			label: "Projets",
			href: "/docs",
		},
		{
			label: "About",
			href: "/about",
		},
	],
	navMenuItems: [
		{
			label: "Profile",
			href: "/profile",
		},
		{
			label: "Projects",
			href: "/projects",
		},
	],
	links: {
		github: "https://github.com/B-Kinda?tab=repositories",
		linkedin: "https://www.linkedin.com/in/blb34/",
	},
};
