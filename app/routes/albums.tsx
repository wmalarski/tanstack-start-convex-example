import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { getSessionQueryOptions } from "~/modules/auth/server/server-functions";
import { TopNavbar } from "~/modules/common/components/top-navbar";

const RouteComponent = () => {
	return (
		<div>
			<TopNavbar />
			<Outlet />
		</div>
	);
};

export const Route = createFileRoute("/albums")({
	component: RouteComponent,
	beforeLoad: async ({ context }) => {
		const token = await context.queryClient.ensureQueryData(
			getSessionQueryOptions(),
		);

		if (!token) {
			throw redirect({ to: "/auth/sign-in" });
		}
	},
});
