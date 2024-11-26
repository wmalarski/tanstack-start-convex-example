import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getRandomAlbumsQueryOptions } from "~/lib/data/albums";
import { AlbumsList } from "./albums-list";

export const RandomAlbumsList = () => {
	const albumsQuery = useSuspenseInfiniteQuery(getRandomAlbumsQueryOptions());
	const albums = albumsQuery.data.pages.flatMap(({ page }) => page);

	return (
		<AlbumsList
			albums={albums}
			hasNextPage={albumsQuery.hasNextPage}
			onLoadMoreClick={albumsQuery.fetchNextPage}
		/>
	);
};
