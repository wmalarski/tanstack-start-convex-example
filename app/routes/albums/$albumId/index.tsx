import { createFileRoute, useParams } from "@tanstack/react-router";
import { Suspense } from "react";
import { AlbumHero } from "~/components/albums/album-hero";

const RouteComponent = () => {
	const params = useParams({ from: "/albums/$albumId/" });

	return (
		<div>
			<Suspense>
				<AlbumHero albumId={params.albumId} />
			</Suspense>
		</div>
	);
};

export const Route = createFileRoute("/albums/$albumId/")({
	component: RouteComponent,
});
