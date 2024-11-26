import { useSuspenseQuery } from "@tanstack/react-query";
import type { Id } from "convex/_generated/dataModel";
import { getAlbumQueryOptions } from "~/lib/data/albums";

type AlbumHeroProps = {
	albumId: Id<"album">;
};

export const AlbumHero = ({ albumId }: AlbumHeroProps) => {
	const albumQuery = useSuspenseQuery(getAlbumQueryOptions({ albumId }));

	return <pre>{JSON.stringify(albumQuery.data, null, 2)}</pre>;
};
