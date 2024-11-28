import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "~/ui/button";
import {
	createBookmarkMutation,
	getBookmarkQueryOptions,
} from "../../server/bookmarks";
import { useAlbumContext } from "../album-context";

export const CreateBookmarkButton = () => {
	const { album } = useAlbumContext();

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: () => {
			return createBookmarkMutation({ data: { albumId: album._id } });
		},
		onSuccess: async () => {
			const options = getBookmarkQueryOptions({ albumId: album._id });
			await queryClient.invalidateQueries({ queryKey: options.queryKey });
		},
	});

	const onClick = () => {
		mutation.mutate();
	};

	return <Button onClick={onClick}>Add bookmark</Button>;
};
