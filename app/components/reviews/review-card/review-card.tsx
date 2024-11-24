import { Link } from "@tanstack/react-router";
import type { Doc } from "convex/_generated/dataModel";

type ReviewCardProps = {
	review: Doc<"review">;
};

export const ReviewCard = ({ review }: ReviewCardProps) => {
	return (
		<li className="relative">
			<Link
				to="/albums/$albumId/"
				params={{ albumId: review.albumId }}
				className="absolute inset-0"
				aria-label="Album details"
			/>
			<pre>{JSON.stringify(review, null, 2)}</pre>
		</li>
	);
};
