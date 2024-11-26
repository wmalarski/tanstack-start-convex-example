import { Button } from "~/ui/button";
import { type AlbumCardData, AlbumCard } from "../album-card/album-card";

type AlbumsListProps = {
	albums: AlbumCardData[];
	hasNextPage: boolean;
	onLoadMoreClick: VoidFunction;
};

export const AlbumsList = ({
	albums,
	hasNextPage,
	onLoadMoreClick,
}: AlbumsListProps) => {
	return (
		<div className="flex flex-col gap-2">
			<ul>
				{albums.map((data) => (
					<AlbumCard key={data.album._id} data={data} />
				))}
			</ul>
			{hasNextPage ? (
				<Button type="button" variant="ghost" onClick={onLoadMoreClick}>
					Load More
				</Button>
			) : null}
		</div>
	);
};
