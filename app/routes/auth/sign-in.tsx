import { createFileRoute } from "@tanstack/react-router";
import { SignInForm } from "~/components/auth/sign-in-form";

const SignIn = () => {
	return <SignInForm />;
};

export const Route = createFileRoute("/auth/sign-in")({
	component: SignIn,
});
