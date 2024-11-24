import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "convex/_generated/api";
import { AlbumsList } from "./albums-list";

export const RandomAlbumsList = () => {
	const randomAlbumsQuery = useSuspenseQuery(
		convexQuery(api.albums.queryRandomAlbums, { take: 20 }),
	);

	return <AlbumsList albums={randomAlbumsQuery.data} />;
};
