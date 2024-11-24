import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";
import { AlbumsList } from "./albums-list";

type ArtistAlbumsListProps = {
	albumId: string;
};

export const ArtistAlbumsList = ({ albumId }: ArtistAlbumsListProps) => {
	const randomAlbumsQuery = useSuspenseQuery(
		convexQuery(api.albums.queryArtistAlbumsByAlbumId, {
			albumId: albumId as Id<"album">,
		}),
	);

	return <AlbumsList albums={randomAlbumsQuery.data} />;
};
