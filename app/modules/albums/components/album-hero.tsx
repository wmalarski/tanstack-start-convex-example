import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { getAlbumQueryOptions } from "../server/albums";
import { formatAlbumTitle } from "../utils/format";
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
			<div className="mx-auto flex max-w-4xl flex-col gap-2 px-2">
				<h1 className="text-3xl">{formatAlbumTitle(albumQuery.data)}</h1>
				<AlbumCoversCarousel size="large" />
				<AlbumActions />
				<Suspense>
					<AlbumBookmark />
				</Suspense>
			</div>
		</AlbumContextProvider>
	);
};
