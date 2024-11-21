import { useAuthToken } from "@convex-dev/auth/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { css } from "styled-system/css";
import { TopNavbar } from "~/components/common/top-navbar";

export const Home = () => {
	const token = useAuthToken();

	return (
		<div className={css({ p: 2 })}>
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
	beforeLoad: () => {
		// console.log(window.localStorage);
		// ctx.context.queryClient.fetchQuery()
	},
});
