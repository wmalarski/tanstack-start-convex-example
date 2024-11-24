import { api } from "convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import { DEFAULT_PAGE_SIZE } from "~/lib/common/constants";
import { AlbumsList } from "./albums-list";

type SearchAlbumsListProps = {
	term: string;
};

export const SearchAlbumsList = ({ term }: SearchAlbumsListProps) => {
	const albumsQuery = usePaginatedQuery(
		api.albums.queryAlbumsByTerm,
		{ term },
		{ initialNumItems: DEFAULT_PAGE_SIZE },
	);

	return <AlbumsList albums={albumsQuery.results} />;
};
