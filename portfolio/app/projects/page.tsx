import { projects } from "@/data/projects";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
	return (
		<section className="py-20">
			<h2 className="text-4xl font-bold mb-8 text-center">Mes Projets</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{projects.map((project) => (
					<ProjectCard key={project.id} project={project} />
				))}
			</div>
		</section>
	);
}
