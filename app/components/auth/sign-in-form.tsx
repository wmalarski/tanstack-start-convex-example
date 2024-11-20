import { useAuthActions } from "@convex-dev/auth/react";
import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import { flex } from "styled-system/patterns";
import { button } from "styled-system/recipes";
import { Button } from "../ui/button";
import { AuthFields } from "./auth-fields";

export const SignInForm = () => {
	const { signIn } = useAuthActions();

	const onSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		void signIn("password", formData);
	};

	return (
		<form
			onSubmit={onSubmit}
			className={flex({ flexDirection: "column", gap: 2 })}
		>
			<input name="flow" type="hidden" value="signIn" />

			<AuthFields />

			<Button type="submit">Sign in</Button>
			<Link to="/auth/sign-up" className={button()}>
				Sign up instead
			</Link>
		</form>
	);
};
