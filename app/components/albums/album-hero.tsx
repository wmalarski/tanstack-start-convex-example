import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";

type AlbumHeroProps = {
	albumId: Id<"album">;
};

export const AlbumHero = ({ albumId }: AlbumHeroProps) => {
	const albumQuery = useSuspenseQuery(
		convexQuery(api.albums.queryAlbum, { albumId }),
	);

	return <pre>{JSON.stringify(albumQuery.data, null, 2)}</pre>;
};
