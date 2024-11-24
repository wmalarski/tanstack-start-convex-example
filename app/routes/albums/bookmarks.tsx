import { createFileRoute } from "@tanstack/react-router";
import { BookmarksAlbumsList } from "~/components/albums/album-lists/bookmarks-albums-list";

const RouteComponent = () => {
	return <BookmarksAlbumsList />;
};

export const Route = createFileRoute("/albums/bookmarks")({
	component: RouteComponent,
});
