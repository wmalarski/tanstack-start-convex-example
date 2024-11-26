import { useSuspenseQuery } from "@tanstack/react-query";
import { getAlbumQueryOptions } from "../server/albums";
import { AlbumActions } from "./album-actions/album-actions";
import { AlbumCoversCarousel } from "./album-covers-carousel";

type AlbumHeroProps = {
	albumId: string;
};

export const AlbumHero = ({ albumId }: AlbumHeroProps) => {
	const albumQuery = useSuspenseQuery(getAlbumQueryOptions({ albumId }));

	return (
		<div>
			<pre>{JSON.stringify(albumQuery.data, null, 2)}</pre>
			<AlbumCoversCarousel album={albumQuery.data.album} />
			<AlbumActions
				artist={albumQuery.data.artist}
				album={albumQuery.data.album}
			/>
		</div>
	);
};
