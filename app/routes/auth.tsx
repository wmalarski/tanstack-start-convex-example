import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="mx-auto w-screen">
			Auth
			<Outlet />
		</div>
	);
}
