import { api } from "convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import { DEFAULT_PAGE_SIZE } from "~/lib/common/constants";
import { ReviewsList } from "./reviews-list";

export const AllReviewsList = () => {
	const reviewsQuery = usePaginatedQuery(
		api.reviews.queryReviews,
		{},
		{ initialNumItems: DEFAULT_PAGE_SIZE },
	);

	const onLoadMoreClick = () => {
		reviewsQuery.loadMore(DEFAULT_PAGE_SIZE);
	};

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
