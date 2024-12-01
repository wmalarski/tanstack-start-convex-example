import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { BookmarkDoc } from "convex/utils";
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
	deleteBookmarkMutation,
	getBookmarkQueryOptions,
} from "../../server/bookmarks";

type DeleteBookmarkAlertProps = {
	bookmark: BookmarkDoc;
};

export const DeleteBookmarkAlert = ({ bookmark }: DeleteBookmarkAlertProps) => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: () => {
			return deleteBookmarkMutation({ data: { bookmarkId: bookmark._id } });
		},
		onSuccess: async () => {
			const options = getBookmarkQueryOptions({ albumId: bookmark.albumId });
			await queryClient.invalidateQueries({ queryKey: options.queryKey });
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
					<AlertDialogAction asChild>
						<Button hasLoader={mutation.isPending} onClick={onContinueClick}>
							Continue
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
