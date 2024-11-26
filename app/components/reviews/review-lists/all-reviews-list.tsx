import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getAllReviewsQueryOptions } from "~/lib/data/reviews";
import { ReviewsList } from "./reviews-list";

export const AllReviewsList = () => {
	const reviewsQuery = useSuspenseInfiniteQuery(getAllReviewsQueryOptions());
	const reviews = reviewsQuery.data.pages.flatMap(({ page }) => page);

	const onLoadMoreClick = () => {
		reviewsQuery.fetchNextPage();
	};

	return (
		<div>
			<ReviewsList reviews={reviews} />
			<button
				type="button"
				onClick={onLoadMoreClick}
				disabled={!reviewsQuery.hasNextPage}
			>
				Load More
			</button>
		</div>
	);
};
