import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { BookmarkDoc } from "convex/utils";
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

	const onClick = () => {
		mutation.mutate();
	};

	return <Button onClick={onClick}>Remove bookmark</Button>;
};
