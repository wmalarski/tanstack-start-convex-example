import { Button } from "~/ui/button";
import { useAlbumContext } from "../album-context";

export const AlbumGoogleButton = () => {
	const { album, artist } = useAlbumContext();

	const onClick = () => {
		const value = `${album.title ?? ""} ${artist.name ?? ""}`;
		const params = new URLSearchParams({ q: value });
		const link = `https://www.google.com/search?${params}`;
		window.open(link, "_blank");
	};

	return <Button onClick={onClick}>Google</Button>;
};
