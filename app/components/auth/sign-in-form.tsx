import { useAuthActions } from "@convex-dev/auth/react";
import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import { Button, buttonVariants } from "../ui/button";
import { AuthFields } from "./auth-fields";

export const SignInForm = () => {
	const { signIn } = useAuthActions();

	const onSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		void signIn("password", formData);
	};

	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-2">
			<input name="flow" type="hidden" value="signIn" />

			<AuthFields />

			<Button type="submit">Sign in</Button>
			<Link to="/auth/sign-up" className={buttonVariants()}>
				Sign up instead
			</Link>
		</form>
	);
};
