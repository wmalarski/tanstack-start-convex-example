import { createFileRoute } from "@tanstack/react-router";
import { SignInForm } from "~/modules/auth/components/sign-in-form";

const RouteComponent = () => {
	return <SignInForm />;
};

export const Route = createFileRoute("/auth/sign-in")({
	component: RouteComponent,
});
