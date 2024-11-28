import { AlbumGoogleButton } from "~/modules/albums/components/album-actions/album-google-button";
import { AlbumYoutubeButton } from "~/modules/albums/components/album-actions/album-youtube-button";
import { DeleteReviewAlert } from "./delete-review-alert";

export const ReviewActions = () => {
	return (
		<>
			<AlbumYoutubeButton />
			<AlbumGoogleButton />
			<DeleteReviewAlert />
		</>
	);
};
