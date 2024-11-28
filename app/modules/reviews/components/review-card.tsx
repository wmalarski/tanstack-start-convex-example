import { Link } from "@tanstack/react-router";
import type { AlbumDoc, ArtistDoc, ReviewDoc } from "convex/utils";
import { AlbumContextProvider } from "~/modules/albums/components/album-context";
import { ReviewActions } from "./review-actions/review-actions";
import { ReviewContextProvider } from "./review-context";

export type ReviewCardData = {
	artist: ArtistDoc;
	review: ReviewDoc;
	album: AlbumDoc;
};

type ReviewCardProps = {
	data: ReviewCardData;
};

export const ReviewCard = ({ data }: ReviewCardProps) => {
	return (
		<AlbumContextProvider {...data}>
			<ReviewContextProvider {...data}>
				<li className="relative">
					<Link
						to="/albums/$albumId"
						params={{ albumId: data.album._id }}
						className="absolute inset-0"
						aria-label="Album details"
					/>
					<ReviewActions />
					<pre>{JSON.stringify(data, null, 2)}</pre>
				</li>
			</ReviewContextProvider>
		</AlbumContextProvider>
	);
};
