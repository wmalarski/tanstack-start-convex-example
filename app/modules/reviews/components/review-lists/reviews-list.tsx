import { Button } from "~/ui/button";
import { ReviewCard, type ReviewCardData } from "../review-card";

type ReviewsListProps = {
	reviews: ReviewCardData[];
	hasNextPage: boolean;
	onLoadMoreClick: VoidFunction;
};

export const ReviewsList = ({
	reviews,
	hasNextPage,
	onLoadMoreClick,
}: ReviewsListProps) => {
	return (
		<div className="flex flex-col gap-2">
			<ul>
				{reviews.map((data) => (
					<ReviewCard key={data.review._id} data={data} />
				))}
			</ul>
			{hasNextPage ? (
				<Button type="button" variant="ghost" onClick={onLoadMoreClick}>
					Load More
				</Button>
			) : null}
		</div>
	);
};
