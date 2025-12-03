"use client";
import React from "react";
import { Card, Skeleton, Button } from "@heroui/react";

export default function CardSkeleton() {
	const [isLoaded, setIsLoaded] = React.useState(false);

	const toggleLoad = () => {
		setIsLoaded(!isLoaded);
	};

	return (
		<div className="flex flex-col gap-3">
			<Card className="w-7xl h-1/2 space-y-5 p-4" radius="lg">
				<Skeleton className="rounded-lg" isLoaded={isLoaded}>
					<div className="h-24 rounded-lg bg-secondary" />
				</Skeleton>
				<div className="space-y-3">
					<Skeleton className="w-1/2 rounded-lg" isLoaded={isLoaded}>
						<h2>Baptiste Lebreton</h2>
					</Skeleton>
					<Skeleton className="w-4/5 rounded-lg" isLoaded={isLoaded}>
						<div className="h-3 w-full rounded-lg bg-secondary-300" />
					</Skeleton>
					<Skeleton className="w-2/5 rounded-lg" isLoaded={isLoaded}>
						<div className="h-3 w-full rounded-lg bg-secondary-200" />
					</Skeleton>
				</div>
			</Card>
			<Button color="secondary" size="sm" variant="flat" onPress={toggleLoad}>
				{isLoaded ? "Show" : "Hide"} profil
			</Button>
		</div>
	);
}
