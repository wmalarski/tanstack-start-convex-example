import { useNavigate } from "@tanstack/react-router";
import { decode } from "decode-formdata";
import type { ComponentProps, PropsWithChildren } from "react";
import { signInMutation } from "~/lib/auth/server-functions";

export const AuthForm = ({ children }: PropsWithChildren) => {
	const navigate = useNavigate();

	const onSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		await signInMutation({ data: decode(formData) });

		await navigate({ to: "/" });
	};

	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-2">
			{children}
		</form>
	);
};
