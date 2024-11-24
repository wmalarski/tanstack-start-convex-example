import { api } from "convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import { ReviewsList } from "./reviews-list";

const PAGE_SIZE = 10;

export const AllReviewsList = () => {
	const reviewsQuery = usePaginatedQuery(
		api.reviews.queryReviews,
		{},
		{ initialNumItems: PAGE_SIZE },
	);

	const onLoadMoreClick = () => {
		reviewsQuery.loadMore(PAGE_SIZE);
	};

	console.log("reviewsQuery", reviewsQuery);

	return (
		<div>
			<ReviewsList reviews={reviewsQuery.results} />
			<button
				type="button"
				onClick={onLoadMoreClick}
				disabled={reviewsQuery.status !== "CanLoadMore"}
			>
				Load More
			</button>
		</div>
	);
};
