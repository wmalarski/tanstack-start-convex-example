import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { AlbumsListLoader } from "~/modules/albums/components/album-lists/albums-list-loader";
import { BookmarksAlbumsList } from "~/modules/albums/components/album-lists/bookmarks-albums-list";
import { getAllBookmarksQueryOptions } from "~/modules/albums/server/bookmarks";

const RouteComponent = () => {
	return (
		<Suspense fallback={<AlbumsListLoader />}>
			<BookmarksAlbumsList />
		</Suspense>
	);
};

export const Route = createFileRoute("/albums/bookmarks")({
	component: RouteComponent,
	loader: async ({ context }) => {
		await context.queryClient.ensureInfiniteQueryData(
			getAllBookmarksQueryOptions(),
		);
	},
});
