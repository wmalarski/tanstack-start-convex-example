import {
	useQueryClient,
	useSuspenseInfiniteQuery,
} from "@tanstack/react-query";

import { getArtistAlbumsQueryOptions } from "../../server/albums";
import { AlbumsList } from "./albums-list";

type ArtistAlbumsListProps = {
	albumId: string;
};

export const ArtistAlbumsList = ({ albumId }: ArtistAlbumsListProps) => {
	const queryClient = useQueryClient();

	const albumsQuery = useSuspenseInfiniteQuery(
		getArtistAlbumsQueryOptions({ albumId, queryClient }),
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
