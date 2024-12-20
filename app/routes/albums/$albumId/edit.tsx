import { createFileRoute, useParams } from "@tanstack/react-router";
import { Suspense } from "react";
import { EditAlbumForm } from "~/modules/albums/components/album-forms/edit-album-form";

const RouteComponent = () => {
	const params = useParams({ from: "/albums/$albumId/" });

	return (
		<div>
			<Suspense>
				<EditAlbumForm albumId={params.albumId} />
			</Suspense>
		</div>
	);
};

export const Route = createFileRoute("/albums/$albumId/edit")({
	component: RouteComponent,
});
