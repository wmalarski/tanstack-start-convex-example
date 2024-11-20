import { createFileRoute } from "@tanstack/react-router";
import { SignUpForm } from "~/components/auth/sign-up-form";

const SignUp = () => {
	return <SignUpForm />;
};

export const Route = createFileRoute("/auth/sign-up")({
	component: SignUp,
});
