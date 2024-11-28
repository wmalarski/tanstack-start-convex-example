import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { getAlbumQueryOptions } from "../server/albums";
import { AlbumActions } from "./album-actions/album-actions";
import { AlbumBookmark } from "./album-bookmark/album-bookmark";
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
				<AlbumCoversCarousel size="large" />
				<AlbumActions />
				<Suspense>
					<AlbumBookmark />
				</Suspense>
			</div>
			<pre>{JSON.stringify(albumQuery.data, null, 2)}</pre>
		</AlbumContextProvider>
	);
};
