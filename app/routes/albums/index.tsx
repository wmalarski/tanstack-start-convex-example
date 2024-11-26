import { createFileRoute, redirect } from "@tanstack/react-router";
import { Suspense } from "react";
import { RandomAlbumsList } from "~/modules/albums/components/album-lists/random-albums-list";
import { getSessionCookie } from "~/modules/auth/server/server-functions";

const RouteComponent = () => {
	return (
		<div className="p-2">
			<Suspense>
				<RandomAlbumsList />
			</Suspense>
		</div>
	);
};

export const Route = createFileRoute("/albums/")({
	component: RouteComponent,
	beforeLoad: async () => {
		const token = await getSessionCookie();
		if (!token) {
			throw redirect({ to: "/auth/sign-in" });
		}
	},
});
