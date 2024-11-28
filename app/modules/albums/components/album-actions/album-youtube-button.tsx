import type {} from "convex/utils";
import { Button } from "~/ui/button";
import { useAlbumContext } from "../album-context";

export const AlbumYoutubeButton = () => {
	const { album, artist } = useAlbumContext();

	const onClick = () => {
		const value = `${album.title ?? ""} ${artist.name ?? ""}`;
		const params = new URLSearchParams({ search_query: value });
		const link = `https://www.youtube.com/results?${params}`;
		window.open(link, "_blank");
	};

	return <Button onClick={onClick}>YT</Button>;
};
