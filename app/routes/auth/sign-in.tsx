import { createFileRoute, redirect } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { SignInForm } from "~/components/auth/sign-in-form";

const SignIn = () => {
	return <SignInForm />;
};

export const Route = createFileRoute("/auth/sign-in")({
	component: SignIn,
	beforeLoad: async (ctx) => {
		const user = await ctx.context.convex.query(api.auth.queryAuthUser);

		console.log({ user });

		if (user) {
			throw redirect({ to: "/" });
		}
	},
});
