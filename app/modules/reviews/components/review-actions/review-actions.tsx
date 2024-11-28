import type { AlbumDoc, ArtistDoc, ReviewDoc } from "convex/utils";
import { AlbumYoutubeButton } from "~/modules/albums/components/album-actions/album-youtube-button";

type ReviewActionsProps = {
	artist: ArtistDoc;
	review: ReviewDoc;
	album: AlbumDoc;
};

export const ReviewActions = ({ album, artist }: ReviewActionsProps) => {
	return (
		<>
			<AlbumYoutubeButton album={album} artist={artist} />
		</>
	);
};
