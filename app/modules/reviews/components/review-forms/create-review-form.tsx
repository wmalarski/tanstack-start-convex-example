import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { decode } from "decode-formdata";
import type { ComponentProps } from "react";
import { Button } from "~/ui/button";
import { createReviewMutation } from "../../server/reviews";
import { ReviewFields } from "./review-fields";

type CreateReviewFormProps = {
	albumId: string;
};

export const CreateReviewForm = ({ albumId }: CreateReviewFormProps) => {
	const navigate = useNavigate();

	const mutation = useMutation({
		mutationFn: (formData: FormData) => {
			return createReviewMutation({ data: decode(formData) });
		},
		onSuccess: async () => {
			await navigate({ to: "/albums/$albumId", params: { albumId } });
		},
	});

	const onSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
		event.preventDefault();
		mutation.mutate(new FormData(event.currentTarget));
	};

	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-2">
			<input type="hidden" defaultValue={albumId} name="albumId" />

			<ReviewFields />

			<Button disabled={mutation.isPending} type="submit">
				Create Review
			</Button>
		</form>
	);
};
