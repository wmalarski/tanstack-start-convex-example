import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { decode } from "decode-formdata";
import type { ComponentProps } from "react";
import { Button, buttonVariants } from "~/ui/button";
import { signInMutation } from "../server/server-functions";
import { AuthFields } from "./auth-fields";

export const SignUpForm = () => {
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
			<input name="flow" type="hidden" value="signUp" />
			<AuthFields />
			<Button hasLoader={mutation.isPending} type="submit">
				Sign up
			</Button>
			<Link to="/auth/sign-in" className={buttonVariants()}>
				Sign in instead
			</Link>
			<Link to="/">Back</Link>
		</form>
	);
};
