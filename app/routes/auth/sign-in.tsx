import { createFileRoute, redirect } from "@tanstack/react-router";
import { SignInForm } from "~/modules/auth/components/sign-in-form";
import { getSessionCookie } from "~/modules/auth/server/server-functions";

const SignIn = () => {
	return <SignInForm />;
};

export const Route = createFileRoute("/auth/sign-in")({
	component: SignIn,
	beforeLoad: async () => {
		const token = await getSessionCookie();
		if (token) {
			throw redirect({ to: "/albums" });
		}
	},
});
