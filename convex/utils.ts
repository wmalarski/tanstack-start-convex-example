import { getAuthUserId } from "@convex-dev/auth/server";
import type {
	DocumentByName,
	GenericQueryCtx,
	TableNamesInDataModel,
} from "convex/server";
import { ConvexError, type GenericId } from "convex/values";
import type { DataModel, Doc, Id } from "./_generated/dataModel";

export type IdAsString<T> = {
	[t in keyof T]: T[t] extends { __tableName: string } ? string : T[t];
};

export type ArtistDoc = IdAsString<Doc<"artist">>;
export type ReviewDoc = IdAsString<Doc<"review">>;
export type AlbumDoc = IdAsString<Doc<"album">>;
export type BookmarkDoc = IdAsString<Doc<"bookmark">>;

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
	reviews: Pick<Doc<"review">, "albumId">[],
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

export type ReviewData = {
	artist: ArtistDoc;
	review: ReviewDoc;
	album: AlbumDoc;
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

export type AlbumData = {
	artist: ArtistDoc;
	album: AlbumDoc;
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

export type BookmarkData = {
	artist: ArtistDoc;
	bookmark: BookmarkDoc;
	album: AlbumDoc;
};

export const matchBookmarkData = (
	bookmarks: Doc<"bookmark">[],
	albumMap: Map<Id<"album">, Doc<"album">>,
	artistMap: Map<Id<"artist">, Doc<"artist">>,
) => {
	const page: BookmarkData[] = [];

	bookmarks.forEach((bookmark) => {
		const album = albumMap.get(bookmark.albumId);

		if (!album) {
			return;
		}

		const artist = artistMap.get(album.artistId);
		if (!artist) {
			return;
		}

		page.push({ bookmark, album, artist });
	});

	return page;
};

export const getUserIdOrThrow = async (ctx: GenericQueryCtx<DataModel>) => {
	const userId = await getAuthUserId(ctx);

	if (!userId) {
		throw new ConvexError("User is unauthorized");
	}

	return userId;
};

export const getDocOrThrow = async <
	TableName extends TableNamesInDataModel<DataModel>,
>(
	ctx: GenericQueryCtx<DataModel>,
	id: GenericId<TableName>,
): Promise<DocumentByName<DataModel, TableName>> => {
	const result = await ctx.db.get(id);

	if (!result) {
		throw new ConvexError("Invalid id");
	}

	return result;
};
