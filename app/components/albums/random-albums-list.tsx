import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "convex/_generated/api";

export const RandomAlbumsList = () => {
	const randomAlbumsQuery = useQuery(
		convexQuery(api.albums.queryRandomAlbums, { take: 20 }),
	);

	return <pre>{JSON.stringify(randomAlbumsQuery.data, null, 2)}</pre>;
};
