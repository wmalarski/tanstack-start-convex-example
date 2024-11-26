import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getAllReviewsQueryOptions } from "~/lib/data/reviews";
import { ReviewsList } from "./reviews-list";

export const AllReviewsList = () => {
	const reviewsQuery = useSuspenseInfiniteQuery(getAllReviewsQueryOptions());
	const reviews = reviewsQuery.data.pages.flatMap(({ page }) => page);

	return (
		<ReviewsList
			reviews={reviews}
			hasNextPage={reviewsQuery.hasNextPage}
			onLoadMoreClick={reviewsQuery.fetchNextPage}
		/>
	);
};
