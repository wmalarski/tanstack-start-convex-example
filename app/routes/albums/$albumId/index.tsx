import { createFileRoute, useParams } from "@tanstack/react-router";
import { Suspense } from "react";
import { AlbumHero } from "~/components/albums/album-hero";
import { ArtistAlbumsList } from "~/components/albums/album-lists/artist-albums-list";
import { ArtistReviewsList } from "~/components/reviews/review-lists/artist-reviews-list";

const RouteComponent = () => {
	const params = useParams({ from: "/albums/$albumId/" });

	return (
		<div>
			<Suspense>
				<AlbumHero albumId={params.albumId} />
			</Suspense>
			<Suspense>
				<ArtistAlbumsList albumId={params.albumId} />
			</Suspense>
			<Suspense>
				<ArtistReviewsList albumId={params.albumId} />
			</Suspense>
		</div>
	);
};

export const Route = createFileRoute("/albums/$albumId/")({
	component: RouteComponent,
});
