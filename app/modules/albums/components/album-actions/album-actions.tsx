import { Link } from "@tanstack/react-router";
import { buttonVariants } from "~/ui/button";
import { useAlbumContext } from "../album-context";
import { AlbumDetailsLink } from "./album-details-link";
import { AlbumGoogleButton } from "./album-google-button";
import { AlbumYoutubeButton } from "./album-youtube-button";

export const AlbumActions = () => {
	const { album } = useAlbumContext();

	return (
		<div className="flex flex-wrap items-center gap-1">
			<AlbumYoutubeButton />
			<AlbumGoogleButton />
			<AlbumDetailsLink />
			<Link
				to="/albums/$albumId/review"
				className={buttonVariants({ size: "sm", variant: "outline" })}
				params={{ albumId: album._id }}
			>
				Review
			</Link>
			<Link
				to="/albums/$albumId/edit"
				className={buttonVariants({ size: "sm", variant: "outline" })}
				params={{ albumId: album._id }}
			>
				Edit
			</Link>
		</div>
	);
};
