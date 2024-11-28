import { buttonVariants } from "~/ui/button";
import { useAlbumContext } from "../album-context";

export const AlbumDetailsLink = () => {
	const { album } = useAlbumContext();

	const details = album.release || (album.sid && albumReleaseHref(album.sid));

	if (!details) {
		return null;
	}

	return (
		<a className={buttonVariants()} href={details}>
			Details
		</a>
	);
};

const albumReleaseHref = (sid: string) =>
	`http://coverartarchive.org/release/${sid}`;
