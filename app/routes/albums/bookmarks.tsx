import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { BookmarksAlbumsList } from "~/modules/albums/components/album-lists/bookmarks-albums-list";
import { getAllBookmarksQueryOptions } from "~/modules/albums/server/bookmarks";

const RouteComponent = () => {
	return (
		<Suspense>
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
