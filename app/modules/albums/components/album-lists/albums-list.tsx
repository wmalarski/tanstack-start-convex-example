import { Button } from "~/ui/button";
import { AlbumCard, type AlbumCardData } from "./album-card";

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
			<ul className="mx-auto grid max-w-4xl grid-cols-1 gap-2 px-2 md:grid-cols-2 lg:grid-cols-3">
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
