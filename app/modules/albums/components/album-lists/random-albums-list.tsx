import {
	useQueryClient,
	useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import { getRandomAlbumsQueryOptions } from "../../server/albums";
import { AlbumsList } from "./albums-list";

export const RandomAlbumsList = () => {
	const queryClient = useQueryClient();
	const albumsQuery = useSuspenseInfiniteQuery(
		getRandomAlbumsQueryOptions(queryClient),
	);
	const albums = albumsQuery.data.pages.flatMap(({ page }) => page);

	return (
		<AlbumsList
			albums={albums}
			hasNextPage={albumsQuery.hasNextPage}
			onLoadMoreClick={albumsQuery.fetchNextPage}
		/>
	);
};
