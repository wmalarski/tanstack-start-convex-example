import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { decode } from "decode-formdata";
import type { ComponentProps } from "react";
import { Button, buttonVariants } from "~/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "~/ui/card";
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
		<form onSubmit={onSubmit} className="mx-auto w-full max-w-lg">
			<input name="flow" type="hidden" value="signIn" />
			<Card className="flex flex-col gap-2">
				<CardHeader className="text-2xl">Sign In</CardHeader>

				<CardContent>
					<AuthFields />
				</CardContent>

				<CardFooter className="flex flex-col gap-2">
					<Button hasLoader={mutation.isPending} type="submit" size="lg">
						Sign in
					</Button>
					<Link
						to="/auth/sign-up"
						className={buttonVariants({ variant: "link", size: "sm" })}
					>
						Sign up instead
					</Link>
				</CardFooter>
			</Card>
		</form>
	);
};
