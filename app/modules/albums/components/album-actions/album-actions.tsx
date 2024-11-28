import { Link } from "@tanstack/react-router";
import { useAlbumContext } from "../album-context";
import { AlbumDetailsLink } from "./album-details-link";
import { AlbumGoogleButton } from "./album-google-button";
import { AlbumYoutubeButton } from "./album-youtube-button";

export const AlbumActions = () => {
	const { album, artist } = useAlbumContext();

	return (
		<div>
			<AlbumYoutubeButton />
			<AlbumGoogleButton />
			<AlbumDetailsLink />
			<Link to="/albums/$albumId/review" params={{ albumId: album._id }}>
				Review
			</Link>
			<Link to="/albums/$albumId/edit" params={{ albumId: album._id }}>
				Edit
			</Link>
			<pre>{JSON.stringify({ album, artist }, null, 2)}</pre>
		</div>
	);
};
