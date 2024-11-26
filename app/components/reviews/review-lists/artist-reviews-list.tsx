import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import type { Id } from "convex/_generated/dataModel";
import { getArtistReviewsQueryOptions } from "~/lib/data/reviews";
import { ReviewsList } from "./reviews-list";

type ArtistReviewsListProps = {
	albumId: Id<"album">;
};

export const ArtistReviewsList = ({ albumId }: ArtistReviewsListProps) => {
	const reviewsQuery = useSuspenseInfiniteQuery(
		getArtistReviewsQueryOptions({
			albumId,
		}),
	);
	const reviews = reviewsQuery.data.pages.flatMap(({ page }) => page);

	return (
		<ReviewsList
			reviews={reviews}
			hasNextPage={reviewsQuery.hasNextPage}
			onLoadMoreClick={reviewsQuery.fetchNextPage}
		/>
	);
};
