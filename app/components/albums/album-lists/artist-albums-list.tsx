import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";
import { usePaginatedQuery } from "convex/react";
import { DEFAULT_PAGE_SIZE } from "~/lib/common/constants";
import { AlbumsList } from "./albums-list";

type ArtistAlbumsListProps = {
	albumId: Id<"album">;
};

export const ArtistAlbumsList = ({ albumId }: ArtistAlbumsListProps) => {
	const albumsQuery = usePaginatedQuery(
		api.albums.queryArtistAlbumsByAlbumId,
		{ albumId },
		{ initialNumItems: DEFAULT_PAGE_SIZE },
	);

	return <AlbumsList albums={albumsQuery.results} />;
};
