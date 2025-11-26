import LuminousButton from "./LuminousButton";
import Image from "next/image";

export default function Hero() {
	return (
		<section className="min-h-screen flex justify-center py-20 bg-gray-900 text-white">
			<div className="text-center max-w-4xl space-y-6">
				<h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
					Développeur FullStack :
					<br />
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
						Portfolio Next.js
					</span>
				</h1>
				<p className="text-xl md:text-2xl mb-8 text-gray-400">
					De l&apos;API Node.js/Express aux interfaces dynamiques React &
					Next.js, je conçois des solutions monolithiques sécurisées et
					performantes.
				</p>
				<div className="flex flex-col items-center gap-4">
					<Image
						src="/images/profil/photo profil.jpg"
						alt="Profil"
						width={200}
						height={200}
						className="rounded-full shadow-lg"
					/>
					<p className="text-lg">
						Je m&apos;appelle Baptiste, jeune développeur passionné par le web.
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia
						quam autem adipisci neque unde rerum ipsa porro eaque possimus
						soluta amet, quasi iste eveniet deserunt esse quod sint ab eos?
					</p>
				</div>
				<div className="h-4">
					<LuminousButton />
				</div>
			</div>
		</section>
	);
}
