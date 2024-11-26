import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getAllBookmarksQueryOptions } from "../../server/bookmarks";
import { AlbumsList } from "./albums-list";

export const BookmarksAlbumsList = () => {
	const albumsQuery = useSuspenseInfiniteQuery(getAllBookmarksQueryOptions());
	const albums = albumsQuery.data.pages.flatMap(({ page }) => page);

	return (
		<AlbumsList
			albums={albums}
			hasNextPage={albumsQuery.hasNextPage}
			onLoadMoreClick={albumsQuery.fetchNextPage}
		/>
	);
};
