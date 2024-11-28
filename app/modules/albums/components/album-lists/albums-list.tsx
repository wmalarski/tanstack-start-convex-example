import { Button } from "~/ui/button";
import { AlbumCard, type AlbumCardData } from "../album-card";

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
			<ul className="grid gap-2">
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
