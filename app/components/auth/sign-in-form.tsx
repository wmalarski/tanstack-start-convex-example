import { Link, useNavigate } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import { signInMutation } from "~/lib/auth/server-functions";
import { Button, buttonVariants } from "../ui/button";
import { AuthFields } from "./auth-fields";

export const SignInForm = () => {
	const navigate = useNavigate();

	const onSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		await signInMutation({
			data: {
				password: formData.get("password"),
				email: formData.get("email"),
				flow: formData.get("flow"),
			},
		});

		await navigate({ to: "/" });
	};

	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-2">
			<input name="flow" type="hidden" value="signIn" />

			<AuthFields />

			<Button type="submit">Sign in</Button>
			<Link to="/auth/sign-up" className={buttonVariants()}>
				Sign up instead
			</Link>
			<Link to="/">Back</Link>
		</form>
	);
};
