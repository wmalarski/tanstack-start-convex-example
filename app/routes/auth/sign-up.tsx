import { createFileRoute } from "@tanstack/react-router";
import { SignUpForm } from "~/modules/auth/components/sign-up-form";

const RouteComponent = () => {
	return <SignUpForm />;
};

export const Route = createFileRoute("/auth/sign-up")({
	component: RouteComponent,
});
