import type { Doc } from "convex/_generated/dataModel";
import { ReviewCard } from "../review-card/review-card";

type ReviewsListProps = {
	reviews: Doc<"review">[];
};

export const ReviewsList = ({ reviews }: ReviewsListProps) => {
	return (
		<ul>
			{reviews.map((review) => (
				<ReviewCard key={review._id} review={review} />
			))}
		</ul>
	);
};
