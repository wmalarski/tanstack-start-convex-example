import { Link } from "@tanstack/react-router";
import type { Doc } from "convex/_generated/dataModel";
import type { OmitId } from "~/lib/convex/types";

export type ReviewCardData = {
	artist: OmitId<Doc<"artist">>;
	review: OmitId<Doc<"review">>;
	album: OmitId<Doc<"album">>;
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
