import { api } from "convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import { DEFAULT_PAGE_SIZE } from "~/lib/common/constants";
import { AlbumsList } from "./albums-list";

export const BookmarksAlbumsList = () => {
	const albumsQuery = usePaginatedQuery(
		api.bookmarks.queryBookmarks,
		{},
		{ initialNumItems: DEFAULT_PAGE_SIZE },
	);

	return <AlbumsList albums={albumsQuery.results} />;
};
