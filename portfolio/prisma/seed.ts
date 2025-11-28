// prisma/seed.ts
import { PrismaClient } from "../src/generated";

const prisma = new PrismaClient();

async function main() {
	const project = await prisma.project.create({
		data: {
			name: "Mon Portfolio",
			description: "Mon portfolio personnel",
			img: "portfolio.jpg",
			technologies: ["Next.js", "TypeScript", "Prisma"],
			gitLink: "https://github.com/votre-compte/portfolio",
			liveLink: "https://mon-portfolio.com",
			creationDate: new Date(),
		},
	});
	console.log({ project });
}

main()
	.catch(console.error)
	.finally(() => prisma.$disconnect());
