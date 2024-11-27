import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { RandomAlbumsList } from "~/modules/albums/components/album-lists/random-albums-list";
import { getRandomAlbumsQueryOptions } from "~/modules/albums/server/albums";

const RouteComponent = () => {
	return (
		<div className="p-2">
			<Suspense>
				<RandomAlbumsList />
			</Suspense>
		</div>
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
