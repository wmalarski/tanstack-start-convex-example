import { createFileRoute, Outlet, useParams } from "@tanstack/react-router";
import { Suspense } from "react";
import { AlbumHero } from "~/modules/albums/components/album-hero";
import { getAlbumQueryOptions } from "~/modules/albums/server/albums";

const RouteComponent = () => {
	const params = useParams({ from: "/albums/$albumId" });

	return (
		<div>
			<Suspense>
				<AlbumHero albumId={params.albumId} />
			</Suspense>
			<Outlet />
		</div>
	);
};

export const Route = createFileRoute("/albums/$albumId")({
	component: RouteComponent,
	loader: async ({ context, params }) => {
		await context.queryClient.ensureQueryData(
			getAlbumQueryOptions({ albumId: params.albumId }),
		);
	},
});
