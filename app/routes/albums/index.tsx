import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { AlbumsListLoader } from "~/modules/albums/components/album-lists/albums-list-loader";
import { RandomAlbumsList } from "~/modules/albums/components/album-lists/random-albums-list";
import { getRandomAlbumsQueryOptions } from "~/modules/albums/server/albums";

const RouteComponent = () => {
	return (
		<Suspense fallback={<AlbumsListLoader />}>
			<RandomAlbumsList />
		</Suspense>
	);
};

export const Route = createFileRoute("/albums/")({
	component: RouteComponent,
	loader: async ({ context }) => {
		await context.queryClient.ensureInfiniteQueryData(
			getRandomAlbumsQueryOptions(),
		);
	},
});
