/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				// Couleurs gaming dark
				"gaming-dark": "#0a0e27",
				"gaming-darker": "#050a15",
				"gaming-accent": "#00d4ff", // Cyan/blue gaming
				"gaming-accent-2": "#ff006e", // Pink gaming accent
				"gaming-accent-3": "#8338ec", // Purple
			},
			backgroundImage: {
				"gradient-gaming": "linear-gradient(135deg, #0a0e27 0%, #1a1a3e 100%)",
			},
		},
	},
	plugins: [],
};
