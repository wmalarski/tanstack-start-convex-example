import type { AlbumDoc, ArtistDoc } from "convex/utils";
import { AlbumDetailsLink } from "./album-details-link";
import { AlbumYoutubeButton } from "./album-youtube-button";

type AlbumActionsProps = {
	artist: ArtistDoc;
	album: AlbumDoc;
};

export const AlbumActions = ({ album, artist }: AlbumActionsProps) => {
	return (
		<div>
			<AlbumYoutubeButton album={album} artist={artist} />
			<AlbumDetailsLink album={album} />
			<pre>{JSON.stringify({ album, artist }, null, 2)}</pre>
		</div>
	);
};
