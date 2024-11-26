import type { AlbumDoc, ArtistDoc } from "convex/utils";

type AlbumActionsProps = {
	artist: ArtistDoc;
	album: AlbumDoc;
};

export const AlbumActions = ({ album, artist }: AlbumActionsProps) => {
	return <pre>{JSON.stringify({ album, artist }, null, 2)}</pre>;
};
