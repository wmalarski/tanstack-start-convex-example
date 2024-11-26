import type { AlbumData } from "convex/utils";
import * as v from "valibot";

export const serializeAlbumData = (albums: AlbumData[]) => {
	return albums.map((entry) => ({
		album: {
			...entry.album,
			_id: entry.album._id.toString(),
			artistId: entry.album.artistId.toString(),
		},
		artist: {
			...entry.artist,
			_id: entry.artist._id.toString(),
		},
	}));
};

export const paginationSchema = v.object({
	id: v.optional(v.number()),
	endCursor: v.optional(v.nullable(v.string())),
	maximumRowsRead: v.optional(v.number()),
	maximumBytesRead: v.optional(v.number()),
	numItems: v.number(),
	cursor: v.nullable(v.string()),
});
