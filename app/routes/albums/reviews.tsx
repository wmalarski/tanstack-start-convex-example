import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { AllReviewsList } from "~/modules/reviews/components/review-lists/all-reviews-list";

const RouteComponent = () => {
	return (
		<Suspense>
			<AllReviewsList />
		</Suspense>
	);
};

export const Route = createFileRoute("/albums/reviews")({
	component: RouteComponent,
});
