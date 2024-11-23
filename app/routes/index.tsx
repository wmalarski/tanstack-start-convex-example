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
	ssr: false,
	// beforeLoad: async (ctx) => {
	// 	// console.log(window.localStorage);
	// 	// const user = ctx.context.convex.watchQuery(api.auth.queryAuthUser);
	// 	// ctx.context.convex.query()
	// 	// user.localQueryResult()
	// 	// console.log({ user });
	// 	// if (!user) {
	// 	// 	throw redirect({ to: "/auth/sign-in" });
	// 	// }
	// },
});
