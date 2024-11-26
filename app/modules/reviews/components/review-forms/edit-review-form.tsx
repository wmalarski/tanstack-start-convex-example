import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { ReviewDoc } from "convex/utils";
import { decode } from "decode-formdata";
import type { ComponentProps } from "react";
import { Button } from "~/ui/button";
import { patchReviewMutation } from "../../server/reviews";
import { ReviewFields } from "./review-fields";

type EditReviewFormProps = {
	review: ReviewDoc;
};

export const EditReviewForm = ({ review }: EditReviewFormProps) => {
	const navigate = useNavigate();

	const mutation = useMutation({
		mutationFn: (formData: FormData) => {
			return patchReviewMutation({ data: decode(formData) });
		},
		onSuccess: async () => {
			await navigate({
				to: "/albums/$albumId",
				params: { albumId: review.albumId },
			});
		},
	});

	const onSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
		event.preventDefault();
		mutation.mutate(new FormData(event.currentTarget));
	};

	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-2">
			<input type="hidden" defaultValue={review._id} name="reviewId" />

			<ReviewFields initial={review} />

			<Button type="submit">Save review</Button>
		</form>
	);
};
