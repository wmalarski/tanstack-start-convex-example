import { createFileRoute, useParams } from "@tanstack/react-router";
import { Suspense } from "react";
import { EditReviewForm } from "~/modules/reviews/components/review-forms/edit-review-form";
import { getReviewQueryOptions } from "~/modules/reviews/server/reviews";

const RouteComponent = () => {
	const params = useParams({ from: "/albums/$albumId/review/$reviewId" });

	return (
		<Suspense>
			<EditReviewForm reviewId={params.reviewId} />
		</Suspense>
	);
};

export const Route = createFileRoute("/albums/$albumId/review/$reviewId")({
	component: RouteComponent,
	loader: async ({ context, params }) => {
		await context.queryClient.ensureQueryData(
			getReviewQueryOptions({ reviewId: params.reviewId }),
		);
	},
});
