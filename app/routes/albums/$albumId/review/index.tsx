import { createFileRoute, useParams } from "@tanstack/react-router";
import { CreateReviewForm } from "~/modules/reviews/components/review-forms/create-review-form";

const RouteComponent = () => {
	const params = useParams({ from: "/albums/$albumId/" });

	return (
		<div>
			<CreateReviewForm albumId={params.albumId} />
		</div>
	);
};

export const Route = createFileRoute("/albums/$albumId/review/")({
	component: RouteComponent,
});
