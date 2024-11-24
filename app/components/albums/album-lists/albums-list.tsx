import { type AlbumCardData, AlbumsCard } from "../album-card/albums-card";

type AlbumsListProps = {
	albums: AlbumCardData[];
};

export const AlbumsList = ({ albums }: AlbumsListProps) => {
	return (
		<ul>
			{albums.map((data) => (
				<AlbumsCard key={data.album._id} data={data} />
			))}
		</ul>
	);
};
