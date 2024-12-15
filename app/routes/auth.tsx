import {
	Link,
	Outlet,
	createFileRoute,
	redirect,
} from "@tanstack/react-router";
import { getSessionQueryOptions } from "~/modules/auth/server/server-functions";

const RouteComponent = () => {
	return (
		<div className="mx-auto w-screen">
			Auth
			<Link to="/">Back</Link>
			<Outlet />
		</div>
	);
};

export const Route = createFileRoute("/auth")({
	component: RouteComponent,
	beforeLoad: async ({ context }) => {
		const token = await context.queryClient.ensureQueryData(
			getSessionQueryOptions(),
		);

		if (token) {
			throw redirect({ to: "/albums" });
		}
	},
});
