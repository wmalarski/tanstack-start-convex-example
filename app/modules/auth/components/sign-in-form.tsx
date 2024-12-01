import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { decode } from "decode-formdata";
import type { ComponentProps } from "react";
import { Button, buttonVariants } from "~/ui/button";
import { signInMutation } from "../server/server-functions";
import { AuthFields } from "./auth-fields";

export const SignInForm = () => {
	const navigate = useNavigate();

	const mutation = useMutation({
		mutationFn: (formData: FormData) => {
			return signInMutation({ data: decode(formData) });
		},
		onSuccess: async () => {
			await navigate({ to: "/" });
		},
	});

	const onSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
		event.preventDefault();
		mutation.mutate(new FormData(event.currentTarget));
	};

	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-2">
			<input name="flow" type="hidden" value="signIn" />

			<AuthFields />

			<Button hasLoader={mutation.isPending} type="submit">
				Sign in
			</Button>
			<Link to="/auth/sign-up" className={buttonVariants()}>
				Sign up instead
			</Link>
			<Link to="/">Back</Link>
		</form>
	);
};
