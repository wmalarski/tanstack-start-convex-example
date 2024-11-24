import { useAuthToken } from "@convex-dev/auth/react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Suspense } from "react";
import { RandomAlbumsList } from "~/components/albums/random-albums-list";
import { getSessionCookie } from "~/lib/auth/server-functions";

const RouteComponent = () => {
	const token = useAuthToken();

	return (
		<div className="p-2">
			<pre>{JSON.stringify({ token }, null, 2)}</pre>
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
