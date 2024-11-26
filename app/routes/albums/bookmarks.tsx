import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { BookmarksAlbumsList } from "~/components/albums/album-lists/bookmarks-albums-list";

const RouteComponent = () => {
	return (
		<Suspense>
			<BookmarksAlbumsList />
		</Suspense>
	);
};

export const Route = createFileRoute("/albums/bookmarks")({
	component: RouteComponent,
});
