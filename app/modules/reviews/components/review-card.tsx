import { Link } from "@tanstack/react-router";
import type { AlbumDoc, ArtistDoc, ReviewDoc } from "convex/utils";

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
		<li className="relative">
			<Link
				to="/albums/$albumId"
				params={{ albumId: data.album._id }}
				className="absolute inset-0"
				aria-label="Album details"
			/>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</li>
	);
};