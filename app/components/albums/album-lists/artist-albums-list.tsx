import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import type { Id } from "convex/_generated/dataModel";
import { getArtistAlbumsQueryOptions } from "~/lib/data/albums";
import { AlbumsList } from "./albums-list";

type ArtistAlbumsListProps = {
	albumId: Id<"album">;
};

export const ArtistAlbumsList = ({ albumId }: ArtistAlbumsListProps) => {
	const albumsQuery = useSuspenseInfiniteQuery(
		getArtistAlbumsQueryOptions({ albumId }),
	);
	const albums = albumsQuery.data.pages.flatMap(({ page }) => page);

	return <AlbumsList albums={albums} />;
};
