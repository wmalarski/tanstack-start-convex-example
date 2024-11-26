import { Link } from "@tanstack/react-router";
import type { Doc } from "convex/_generated/dataModel";
import type { IdAsString } from "convex/utils";

export type AlbumCardData = {
	artist: IdAsString<Doc<"artist">>;
	album: IdAsString<Doc<"album">>;
};

type AlbumsCardProps = {
	data: AlbumCardData;
};

export const AlbumsCard = ({ data }: AlbumsCardProps) => {
	return (
		<li className="relative">
			<Link
				to="/albums/$albumId"
				params={{ albumId: data.album._id }}
				className="absolute inset-0"
				aria-label="Details"
			/>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</li>
	);
};
