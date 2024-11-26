import { Link } from "@tanstack/react-router";
import { Button, buttonVariants } from "../ui/button";
import { AuthFields } from "./auth-fields";
import { AuthForm } from "./auth-form";

export const SignInForm = () => {
	return (
		<AuthForm>
			<input name="flow" type="hidden" value="signIn" />

			<AuthFields />

			<Button type="submit">Sign in</Button>
			<Link to="/auth/sign-up" className={buttonVariants()}>
				Sign up instead
			</Link>
			<Link to="/">Back</Link>
		</AuthForm>
	);
};
