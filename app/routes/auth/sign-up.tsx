import { createFileRoute, redirect } from "@tanstack/react-router";
import { SignUpForm } from "~/modules/auth/components/sign-up-form";
import { getSessionCookie } from "~/modules/auth/server/server-functions";

const SignUp = () => {
	return <SignUpForm />;
};

export const Route = createFileRoute("/auth/sign-up")({
	component: SignUp,
	beforeLoad: async () => {
		const token = await getSessionCookie();
		if (token) {
			throw redirect({ to: "/albums" });
		}
	},
});
