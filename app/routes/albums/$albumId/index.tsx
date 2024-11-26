import { createFileRoute, useParams } from "@tanstack/react-router";
import { Suspense } from "react";
import { AlbumHero } from "~/modules/albums/components/album-hero";
import { ArtistAlbumsList } from "~/modules/albums/components/album-lists/artist-albums-list";
import { ArtistReviewsList } from "~/modules/reviews/components/review-lists/artist-reviews-list";

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
