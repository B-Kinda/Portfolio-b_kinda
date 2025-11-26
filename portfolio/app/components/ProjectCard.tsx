import Image from "next/image";
import type { Project } from "@/app/types/Project";

interface ProjectCardProps {
	project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
	return (
		<div className="w-full h-full rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 bg-gray-800">
			<div className="relative h-80">
				<Image
					src={project.img}
					alt={project.name}
					width={500}
					height={500}
					className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
					placeholder="blur"
					blurDataURL={project.img}
				/>
			</div>
			<div className="p-6">
				<h3 className="text-xl font-bold mb-2 text-white">{project.name}</h3>
				<p className="text-gray-300 mb-4">{project.description}</p>
				<div className="flex flex-wrap gap-2 mb-4">
					{project.technologies.map((tech) => (
						<span
							key={tech}
							className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full"
						>
							{tech}
						</span>
					))}
				</div>
				<div className="flex space-x-4">
					{project.liveLink && (
						<a
							href={project.liveLink}
							target="blank"
							rel="noopener noreferrer"
							className="text-blue-400 hover:text-blue-300"
						>
							Voir la démo
						</a>
					)}
					{project.codeLink && (
						<a
							href={project.codeLink}
							target="blank"
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
