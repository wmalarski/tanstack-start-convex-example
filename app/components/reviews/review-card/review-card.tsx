import { Link } from "@tanstack/react-router";
import type { Doc } from "convex/_generated/dataModel";
import type { IdAsString } from "convex/utils";

export type ReviewCardData = {
	artist: IdAsString<Doc<"artist">>;
	review: IdAsString<Doc<"review">>;
	album: IdAsString<Doc<"album">>;
};

type ReviewCardProps = {
	data: ReviewCardData;
};

export const ReviewCard = ({ data }: ReviewCardProps) => {
	return (
		<li className="relative">
			<Link
				to="/albums/$albumId/"
				params={{ albumId: data.album._id }}
				className="absolute inset-0"
				aria-label="Album details"
			/>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</li>
	);
};
