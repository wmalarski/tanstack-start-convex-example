import { useAlbumContext } from "../album-context";
import { AlbumDetailsLink } from "./album-details-link";
import { AlbumYoutubeButton } from "./album-youtube-button";

export const AlbumActions = () => {
	const { album, artist } = useAlbumContext();

	return (
		<div>
			<AlbumYoutubeButton />
			<AlbumDetailsLink />
			<pre>{JSON.stringify({ album, artist }, null, 2)}</pre>
		</div>
	);
};
