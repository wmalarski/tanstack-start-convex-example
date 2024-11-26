import { Outlet, createFileRoute } from "@tanstack/react-router";
import { TopNavbar } from "~/modules/common/components/top-navbar";

const RouteComponent = () => {
	return (
		<div>
			<TopNavbar />
			<Outlet />
		</div>
	);
};

export const Route = createFileRoute("/reviews")({
	component: RouteComponent,
});
