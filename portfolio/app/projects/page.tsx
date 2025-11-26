import { projects } from "@/data/projects";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
	return (
		<section className="py-20">
			<h1 className="text-7xl font-bold mb-8 text-center text-white">
				Mes Projets
			</h1>
			<div className="flex flex-col gap-8 px-4 max-w-6xl mx-auto">
				{projects.map((project) => (
					<ProjectCard key={project.id} project={project} />
				))}
			</div>
		</section>
	);
}
