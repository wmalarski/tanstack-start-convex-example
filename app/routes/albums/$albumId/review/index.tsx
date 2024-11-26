import { createFileRoute, useParams } from "@tanstack/react-router";
import { Suspense } from "react";
import { AlbumHero } from "~/modules/albums/components/album-hero";
import { CreateReviewForm } from "~/modules/reviews/components/review-forms/create-review-form";

const RouteComponent = () => {
	const params = useParams({ from: "/albums/$albumId/" });

	return (
		<div>
			<Suspense>
				<AlbumHero albumId={params.albumId} />
			</Suspense>
			<CreateReviewForm albumId={params.albumId} />
		</div>
	);
};

export const Route = createFileRoute("/albums/$albumId/review/")({
	component: RouteComponent,
});
