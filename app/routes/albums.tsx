import { createFileRoute, Outlet } from "@tanstack/react-router";
import { TopNavbar } from "~/components/common/top-navbar";

const RouteComponent = () => {
	return (
		<div className="mx-auto w-screen">
			<TopNavbar />
			<Outlet />
		</div>
	);
};

export const Route = createFileRoute("/albums")({
	component: RouteComponent,
});
