import { Link } from "@tanstack/react-router";
import type { Doc } from "convex/_generated/dataModel";

type AlbumsCardProps = {
	album: Doc<"album">;
};

export const AlbumsCard = ({ album }: AlbumsCardProps) => {
	return (
		<li>
			<Link
				to="/albums/$albumId/"
				params={{ albumId: album._id }}
				className="absolute inset-0"
				aria-label="Details"
			/>
			<pre>{JSON.stringify(album, null, 2)}</pre>
		</li>
	);
};
