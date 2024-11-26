import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { decode } from "decode-formdata";
import type { ComponentProps } from "react";
import { Button } from "~/ui/button";
import {
	getReviewQueryOptions,
	patchReviewMutation,
} from "../../server/reviews";
import { ReviewFields } from "./review-fields";

type EditReviewFormProps = {
	reviewId: string;
};

export const EditReviewForm = ({ reviewId }: EditReviewFormProps) => {
	const navigate = useNavigate();

	const reviewQuery = useSuspenseQuery(getReviewQueryOptions({ reviewId }));

	const mutation = useMutation({
		mutationFn: (formData: FormData) => {
			return patchReviewMutation({ data: decode(formData) });
		},
		onSuccess: async () => {
			await navigate({
				to: "/albums/$albumId",
				params: { albumId: reviewQuery.data.albumId },
			});
		},
	});

	const onSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
		event.preventDefault();
		mutation.mutate(new FormData(event.currentTarget));
	};

	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-2">
			<input type="hidden" defaultValue={reviewId} name="reviewId" />

			<ReviewFields initial={reviewQuery.data} />

			<Button type="submit">Save review</Button>
		</form>
	);
};
