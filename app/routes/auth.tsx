import {
	Link,
	Outlet,
	createFileRoute,
	redirect,
} from "@tanstack/react-router";
import { getSessionCookie } from "~/modules/auth/server/server-functions";

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
	beforeLoad: async () => {
		const token = await getSessionCookie();
		if (token) {
			throw redirect({ to: "/albums" });
		}
	},
});
