import { createFileRoute, Outlet } from "@tanstack/react-router";
import { TopNavbar } from "~/components/common/top-navbar";

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
