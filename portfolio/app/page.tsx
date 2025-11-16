// page.tsx est la page d'accueil
import Link from "next/link";
export default function Home() {
	return (
		<section className="text-center py-20 bg-gray-900 text-white">
			<h1 className="text-5xl font-extrabold mb-4">
				Bienvenue sur mon Portfolio !
			</h1>
			<p className="text-xl mb-8 text-gray-400">
				Je suis un développeur web passionné par la création d&apos;interfaces
				utilisateur modernes et réactives.
			</p>
			<div>
				<Link href="/projects" className="btn-primary">
					Voir mes projets
				</Link>
			</div>
		</section>
	);
}
