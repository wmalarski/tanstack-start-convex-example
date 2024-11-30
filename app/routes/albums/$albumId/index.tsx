import { createFileRoute, useParams } from "@tanstack/react-router";
import { Suspense } from "react";
import { AlbumsListLoader } from "~/modules/albums/components/album-lists/albums-list-loader";
import { ArtistAlbumsList } from "~/modules/albums/components/album-lists/artist-albums-list";
import { ArtistReviewsList } from "~/modules/reviews/components/review-lists/artist-reviews-list";

const RouteComponent = () => {
	const params = useParams({ from: "/albums/$albumId/" });

	return (
		<div className="flex flex-col gap-4">
			<h2 className="mx-auto max-w-4xl text-start font-semibold text-xl">
				ArtistAlbumsList
			</h2>
			<Suspense fallback={<AlbumsListLoader />}>
				<ArtistAlbumsList albumId={params.albumId} />
			</Suspense>
			<h2 className="mx-auto max-w-4xl text-start font-semibold text-xl">
				ArtistReviewsList
			</h2>
			<Suspense fallback={<AlbumsListLoader />}>
				<ArtistReviewsList albumId={params.albumId} />
			</Suspense>
		</div>
	);
};

export const Route = createFileRoute("/albums/$albumId/")({
	component: RouteComponent,
});
