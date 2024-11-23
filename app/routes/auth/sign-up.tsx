import { createFileRoute } from "@tanstack/react-router";
import { SignUpForm } from "~/components/auth/sign-up-form";

const SignUp = () => {
	return <SignUpForm />;
};

export const Route = createFileRoute("/auth/sign-up")({
	ssr: false,
	component: SignUp,
	// beforeLoad: async (ctx) => {
	// 	const user = await ctx.context.convex.query(api.auth.queryAuthUser);

	// 	console.log({ user });

	// 	if (user) {
	// 		throw redirect({ to: "/" });
	// 	}
	// },
});
