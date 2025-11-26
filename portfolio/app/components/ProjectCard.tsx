import Image from "next/image";
import type { Project } from "@/app/types/Project";

interface ProjectCardProps {
	project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
	return (
		<div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-800">
			<div className="relative h-48">
				<Image
					src={project.img}
					alt={project.name}
					fill
					className="object-cover"
				/>
			</div>
			<div className="p-6">
				<h3 className="text-xl font-bold mb-2 text-white">{project.name}</h3>
				<p className="text-gray-300 mb-4">{project.description}</p>
				{/* Badges des technologies */}
				<div className="flex flex-wrap gap-2 mb-4">
					{project.technologies.map((tech) => (
						<span
							key={tech}
							className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full"
						>
							{tech}
						</span>
					))}
				</div>
				{/* Boutons d'action */}
				<div className="flex space-x-4">
					{project.liveLink && (
						<a
							href={project.liveLink}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-400 hover:text-blue-300"
						>
							Voir la démo
						</a>
					)}
					{project.codeLink && (
						<a
							href={project.codeLink}
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-400 hover:text-white"
						>
							Code source
						</a>
					)}
				</div>
			</div>
		</div>
	);
}
