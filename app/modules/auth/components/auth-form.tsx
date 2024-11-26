import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { decode } from "decode-formdata";
import type { ComponentProps, PropsWithChildren } from "react";
import { signInMutation } from "../server/server-functions";

export const AuthForm = ({ children }: PropsWithChildren) => {
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
			{children}
		</form>
	);
};
