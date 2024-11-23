import {} from "@convex-dev/auth/react";
import { Link } from "@tanstack/react-router";
import { Button, buttonVariants } from "../ui/button";
import { AuthFields } from "./auth-fields";
import { AuthForm } from "./auth-form";

export const SignUpForm = () => {
	return (
		<AuthForm>
			<input name="flow" type="hidden" value="signUp" />
			<AuthFields />
			<Button type="submit">Sign up</Button>
			<Link to="/auth/sign-in" className={buttonVariants()}>
				Sign in instead
			</Link>
			<Link to="/">Back</Link>
		</AuthForm>
	);
};
