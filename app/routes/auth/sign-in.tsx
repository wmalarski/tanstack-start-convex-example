import { createFileRoute } from "@tanstack/react-router";
import { SignInForm } from "~/components/auth/sign-in-form";

const SignIn = () => {
	return <SignInForm />;
};

export const Route = createFileRoute("/auth/sign-in")({
	component: SignIn,
	ssr: false,
	// beforeLoad: async (ctx) => {
	// 	const user = await ctx.context.convex.query(api.auth.queryAuthUser);

	// 	console.log({ user });

	// 	if (user) {
	// 		throw redirect({ to: "/" });
	// 	}
	// },
});
