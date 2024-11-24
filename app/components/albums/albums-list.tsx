import type { Doc } from "convex/_generated/dataModel";
import { AlbumsCard } from "./album-card/albums-card";

type AlbumsListProps = {
	albums: Doc<"album">[];
};

export const AlbumsList = ({ albums }: AlbumsListProps) => {
	return (
		<ul>
			{albums.map((album) => (
				<AlbumsCard key={album._id} album={album} />
			))}
		</ul>
	);
};
