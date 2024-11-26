import { createFileRoute, useParams } from "@tanstack/react-router";
import { Suspense } from "react";
import { AlbumHero } from "~/modules/albums/components/album-hero";
import { EditReviewForm } from "~/modules/reviews/components/review-forms/edit-review-form";

const RouteComponent = () => {
	const params = useParams({ from: "/albums/$albumId/review/$reviewId" });

	return (
		<div>
			<Suspense>
				<AlbumHero albumId={params.albumId} />
			</Suspense>
			<Suspense>
				<EditReviewForm reviewId={params.reviewId} />
			</Suspense>
		</div>
	);
};

export const Route = createFileRoute("/albums/$albumId/review/$reviewId")({
	component: RouteComponent,
});
