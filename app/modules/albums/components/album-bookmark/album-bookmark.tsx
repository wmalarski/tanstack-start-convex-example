import { useSuspenseQuery } from "@tanstack/react-query";
import { getBookmarkQueryOptions } from "../../server/bookmarks";
import { useAlbumContext } from "../album-context";
import { CreateBookmarkButton } from "./create-bookmark-button";
import { DeleteBookmarkAlert } from "./delete-bookmark-alert";

export const AlbumBookmark = () => {
	const { album } = useAlbumContext();

	const bookmarkQuery = useSuspenseQuery(
		getBookmarkQueryOptions({ albumId: album._id }),
	);

	if (bookmarkQuery.data) {
		return <DeleteBookmarkAlert bookmark={bookmarkQuery.data} />;
	}

	return <CreateBookmarkButton />;
};
