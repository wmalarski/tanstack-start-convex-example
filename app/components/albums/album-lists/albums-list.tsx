import { Button } from "~/components/ui/button";
import { type AlbumCardData, AlbumsCard } from "../album-card/albums-card";

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
					<AlbumsCard key={data.album._id} data={data} />
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
