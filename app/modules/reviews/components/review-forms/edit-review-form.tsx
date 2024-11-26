import { useNavigate } from "@tanstack/react-router";
import { decode } from "decode-formdata";
import type { ComponentProps, PropsWithChildren } from "react";
import { Button } from "~/ui/button";
import { signInMutation } from "../server/server-functions";
import { ReviewFields } from "./review-fields";

export const AuthForm = ({ children }: PropsWithChildren) => {
	return { children };
};

export const EditReviewForm = () => {
	const navigate = useNavigate();

	const onSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		await signInMutation({ data: decode(formData) });

		await navigate({ to: "/" });
	};

	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-2">
			<ReviewFields />

			<Button type="submit">Save review</Button>
		</form>
	);
};
