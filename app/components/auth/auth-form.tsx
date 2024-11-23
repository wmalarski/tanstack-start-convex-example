import { useAuthActions, useAuthToken } from "@convex-dev/auth/react";
import { useNavigate } from "@tanstack/react-router";
import type { ComponentProps, PropsWithChildren } from "react";
import {} from "../ui/button";

export const AuthForm = ({ children }: PropsWithChildren) => {
	const navigate = useNavigate();

	const authToken = useAuthToken();
	const getAuthToken = () => authToken;

	const { signIn } = useAuthActions();

	const onSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const response = await signIn("password", formData);

		const authToken = getAuthToken();

		console.log("authToken", { authToken });

		if (response.signingIn) {
			await navigate({ to: "/" });
		}
	};

	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-2">
			{children}
		</form>
	);
};
