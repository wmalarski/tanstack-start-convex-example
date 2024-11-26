import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getSearchAlbumsQueryOptions } from "~/lib/data/albums";
import { AlbumsList } from "./albums-list";

type SearchAlbumsListProps = {
	term: string;
};

export const SearchAlbumsList = ({ term }: SearchAlbumsListProps) => {
	const albumsQuery = useSuspenseInfiniteQuery(
		getSearchAlbumsQueryOptions({ term }),
	);
	const albums = albumsQuery.data.pages.flatMap(({ page }) => page);

	return <AlbumsList albums={albums} />;
};
