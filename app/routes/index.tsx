import { createFileRoute, Link } from "@tanstack/react-router";

const RouteComponent = () => {
	return (
		<div className="flex flex-col gap-2 p-2">
			<Link to="/auth/sign-in">Sign In</Link>
			<Link to="/auth/sign-up">Sign Up</Link>
			<Link to="/albums">Albums</Link>
		</div>
	);
};

export const Route = createFileRoute("/")({
	component: RouteComponent,
});
