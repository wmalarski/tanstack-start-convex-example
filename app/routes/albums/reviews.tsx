import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { AlbumsListLoader } from "~/modules/albums/components/album-lists/albums-list-loader";
import { AllReviewsList } from "~/modules/reviews/components/review-lists/all-reviews-list";
import { getAllReviewsQueryOptions } from "~/modules/reviews/server/reviews";

const RouteComponent = () => {
	return (
		<Suspense fallback={<AlbumsListLoader />}>
			<AllReviewsList />
		</Suspense>
	);
};

export const Route = createFileRoute("/albums/reviews")({
	component: RouteComponent,
	loader: async ({ context }) => {
		await context.queryClient.ensureInfiniteQueryData(
			getAllReviewsQueryOptions(),
		);
	},
});
