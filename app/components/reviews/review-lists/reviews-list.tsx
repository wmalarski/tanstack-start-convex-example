import { ReviewCard, type ReviewCardData } from "../review-card/review-card";

type ReviewsListProps = {
	reviews: ReviewCardData[];
};

export const ReviewsList = ({ reviews }: ReviewsListProps) => {
	return (
		<ul>
			{reviews.map((data) => (
				<ReviewCard key={data.review._id} data={data} />
			))}
		</ul>
	);
};
