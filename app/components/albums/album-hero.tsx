import { useSuspenseQuery } from "@tanstack/react-query";
import { getAlbumQueryOptions } from "~/lib/data/albums";

type AlbumHeroProps = {
	albumId: string;
};

export const AlbumHero = ({ albumId }: AlbumHeroProps) => {
	const albumQuery = useSuspenseQuery(getAlbumQueryOptions({ albumId }));

	return <pre>{JSON.stringify(albumQuery.data, null, 2)}</pre>;
};
