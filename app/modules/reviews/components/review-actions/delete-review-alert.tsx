import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "~/ui/alert-dialog";
import { Button } from "~/ui/button";
import {
	deleteReviewMutation,
	getAllReviewsQueryOptions,
	getArtistReviewsQueryOptions,
} from "../../server/reviews";
import { useReviewContext } from "../review-context";

export const DeleteReviewAlert = () => {
	const { review } = useReviewContext();

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: () => {
			return deleteReviewMutation({ data: { reviewId: review._id } });
		},
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: getAllReviewsQueryOptions().queryKey,
				}),
				queryClient.invalidateQueries({
					queryKey: getArtistReviewsQueryOptions({ albumId: review.albumId })
						.queryKey,
				}),
			]);
		},
	});

	const onContinueClick = () => {
		mutation.mutate();
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button>Delete review</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						review.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={onContinueClick}>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
