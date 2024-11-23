import { useAuthToken } from "@convex-dev/auth/react";
import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import { TopNavbar } from "~/components/common/top-navbar";
import { getSessionCookie } from "~/lib/auth/server-functions";

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
	beforeLoad: async () => {
		const token = await getSessionCookie();
		if (!token) {
			throw redirect({ to: "/auth/sign-in" });
		}
	},
});
