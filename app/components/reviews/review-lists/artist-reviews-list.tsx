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
