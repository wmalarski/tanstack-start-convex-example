import type { GenericQueryCtx } from "convex/server";
import type { DataModel, Doc, Id } from "./_generated/dataModel";

export const getUniqueArtistsMap = async (
	ctx: GenericQueryCtx<DataModel>,
	albums: Doc<"album">[],
) => {
	const artistIds = albums.map((album) => album.artistId);
	const uniqueArtistIds = [...new Set(artistIds)];

	const artists = await ctx.db
		.query("artist")
		.filter((q) =>
			q.or(
				...uniqueArtistIds.map((artistId) => q.eq(q.field("_id"), artistId)),
			),
		)
		.collect();

	return new Map(artists.map((artist) => [artist._id, artist]));
};

export const getUniqueAlbums = async (
	ctx: GenericQueryCtx<DataModel>,
	reviews: Doc<"review">[],
) => {
	const albumIds = reviews.map((review) => review.albumId);
	const uniqueAlbumIds = [...new Set(albumIds)];

	const albums = await ctx.db
		.query("album")
		.filter((q) =>
			q.or(...uniqueAlbumIds.map((albumId) => q.eq(q.field("_id"), albumId))),
		)
		.collect();

	return {
		albums,
		albumMap: new Map(albums.map((artist) => [artist._id, artist])),
	};
};

type ReviewData = {
	artist: Doc<"artist">;
	review: Doc<"review">;
	album: Doc<"album">;
};

export const matchReviewData = (
	reviews: Doc<"review">[],
	albumMap: Map<Id<"album">, Doc<"album">>,
	artistMap: Map<Id<"artist">, Doc<"artist">>,
) => {
	const page: ReviewData[] = [];

	reviews.forEach((review) => {
		const album = albumMap.get(review.albumId);

		if (!album) {
			return;
		}

		const artist = artistMap.get(album.artistId);
		if (!artist) {
			return;
		}

		page.push({ review, album, artist });
	});

	return page;
};

type AlbumData = {
	artist: Doc<"artist">;
	album: Doc<"album">;
};

export const matchAlbumData = (
	albums: Doc<"album">[],
	artistMap: Map<Id<"artist">, Doc<"artist">>,
) => {
	const page: AlbumData[] = [];

	albums.forEach((album) => {
		const artist = artistMap.get(album.artistId);
		if (!artist) {
			return;
		}

		page.push({ album, artist });
	});

	return page;
};
