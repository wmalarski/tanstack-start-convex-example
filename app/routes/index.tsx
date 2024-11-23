import { useAuthToken } from "@convex-dev/auth/react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { TopNavbar } from "~/components/common/top-navbar";

export const Home = () => {
	const token = useAuthToken();

	return (
		<div className="p-2">
			<TopNavbar />
			<h3>Welcome Home!!!</h3>
			<Link to="/auth/sign-in">Sign In</Link>
			<Link to="/auth/sign-up">Sign Up</Link>
			<pre>{JSON.stringify({ token }, null, 2)}</pre>
		</div>
	);
};

export const Route = createFileRoute("/")({
	component: Home,
	beforeLoad: (ctx) => {
		ctx.context.queryClient;
		// console.log(window.localStorage);
		// ctx.context.queryClient.fetchQuery()
	},
});
