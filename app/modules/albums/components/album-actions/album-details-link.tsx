import type { AlbumDoc } from "convex/utils";
import { buttonVariants } from "~/ui/button";

type AlbumDetailsLinkProps = {
	album: AlbumDoc;
};

export const AlbumDetailsLink = ({ album }: AlbumDetailsLinkProps) => {
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
