import { useSuspenseQuery } from "@tanstack/react-query";
import { getAlbumQueryOptions } from "../server/albums";
import { AlbumActions } from "./album-actions/album-actions";
import { AlbumContextProvider } from "./album-context";
import { AlbumCoversCarousel } from "./album-covers-carousel";

type AlbumHeroProps = {
	albumId: string;
};

export const AlbumHero = ({ albumId }: AlbumHeroProps) => {
	const albumQuery = useSuspenseQuery(getAlbumQueryOptions({ albumId }));

	return (
		<AlbumContextProvider {...albumQuery.data}>
			<div>
				<pre>{JSON.stringify(albumQuery.data, null, 2)}</pre>
				<AlbumCoversCarousel size="large" />
				<AlbumActions />
			</div>
		</AlbumContextProvider>
	);
};
