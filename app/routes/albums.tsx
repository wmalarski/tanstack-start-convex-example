import { Outlet, createFileRoute } from "@tanstack/react-router";
import { TopNavbar } from "~/components/common/top-navbar";

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
});
