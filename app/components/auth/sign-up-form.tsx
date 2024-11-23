import { useAuthActions } from "@convex-dev/auth/react";
import { Link, useNavigate } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import { Button, buttonVariants } from "../ui/button";
import { AuthFields } from "./auth-fields";

export const SignUpForm = () => {
	const navigate = useNavigate();

	const { signIn } = useAuthActions();

	const onSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const response = await signIn("password", formData);

		if (response.signingIn) {
			navigate({ to: "/" });
		}
	};

	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-2">
			<input name="flow" type="hidden" value="signUp" />
			<AuthFields />
			<Button type="submit">Sign up</Button>
			<Link to="/auth/sign-in" className={buttonVariants()}>
				Sign in instead
			</Link>
			<Link to="/">Back</Link>
		</form>
	);
};
