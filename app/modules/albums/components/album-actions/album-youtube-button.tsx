import type { AlbumDoc, ArtistDoc } from "convex/utils";
import { Button } from "~/ui/button";

type AlbumYoutubeButtonProps = {
	album: AlbumDoc;
	artist: ArtistDoc;
};

export const AlbumYoutubeButton = ({
	album,
	artist,
}: AlbumYoutubeButtonProps) => {
	return (
		<Button onClick={() => redirectToYt(album.title, artist.name)}>YT</Button>
	);
};

const redirectToYt = (title: string, name: string): void => {
	if (typeof window === "undefined") {
		return;
	}
	const value = `${title ?? ""} ${name ?? ""}`;
	const params = new URLSearchParams({ search_query: value });
	const link = `https://www.youtube.com/results?${params}`;
	window.open(link, "_blank");
};
