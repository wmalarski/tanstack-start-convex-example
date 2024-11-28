import type { AlbumDoc, ArtistDoc } from "convex/utils";

type FormatAlbumTitleArgs = {
	album: AlbumDoc;
	artist: ArtistDoc;
};

export const formatAlbumTitle = ({ album, artist }: FormatAlbumTitleArgs) => {
	const year = album.year ? `(${album.year})` : "";
	return `${artist.name} - ${album.title}${year}`;
};
