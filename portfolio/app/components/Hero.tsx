import Link from "next/link";
import LuminousButton from "./LuminousButton";

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
				<div>
					<Link href="/challenges">
						<LuminousButton />
					</Link>
				</div>
			</div>
		</section>
	);
}
