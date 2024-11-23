import { useAuthActions } from "@convex-dev/auth/react";
import { useNavigate } from "@tanstack/react-router";
import type { ComponentProps, PropsWithChildren } from "react";

export const AuthForm = ({ children }: PropsWithChildren) => {
	const navigate = useNavigate();

	const { signIn } = useAuthActions();

	const onSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const response = await signIn("password", formData);

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
