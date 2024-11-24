import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";
import { usePaginatedQuery } from "convex/react";
import { ReviewsList } from "./reviews-list";

const PAGE_SIZE = 10;

type ArtistReviewsListProps = {
	albumId: Id<"album">;
};

export const ArtistReviewsList = ({ albumId }: ArtistReviewsListProps) => {
	const reviewsQuery = usePaginatedQuery(
		api.reviews.queryReviewsByArtistAlbumId,
		{ albumId },
		{ initialNumItems: PAGE_SIZE },
	);

	const onLoadMoreClick = () => {
		reviewsQuery.loadMore(PAGE_SIZE);
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
