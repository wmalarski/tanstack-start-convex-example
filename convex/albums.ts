import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import {
	type AlbumDoc,
	type ArtistDoc,
	getDocOrThrow,
	getUniqueArtistsMap,
	getUserIdOrThrow,
	matchAlbumData,
} from "./utils";

export const queryRandomAlbums = query({
	args: { paginationOpts: paginationOptsValidator },
	handler: async (ctx, args) => {
		const userId = await getUserIdOrThrow(ctx);

		const reviews = await ctx.db
			.query("review")
			.withIndex("reviewUsers", (q) => q.eq("userId", userId))
			.collect();

		const reviewedAlbumIds = new Set(reviews.map((review) => review.albumId));

		const randomSeed = String(Math.floor(Math.random() * 1e10)).slice(0, 2);

		const albums = await ctx.db
			.query("album")
			.withSearchIndex("albumRandom", (q) => q.search("random", randomSeed))
			.paginate(args.paginationOpts);

		const withoutReviews = albums.page.filter(
			(album) => !reviewedAlbumIds.has(album._id),
		);

		const artistMap = await getUniqueArtistsMap(ctx, withoutReviews);

		return { ...albums, page: matchAlbumData(albums.page, artistMap) };
	},
});

export const queryAlbum = query({
	args: { albumId: v.id("album") },
	handler: async (ctx, args) => {
		await getUserIdOrThrow(ctx);

		const album = await getDocOrThrow(ctx, args.albumId);
		const artist = await getDocOrThrow(ctx, album.artistId);

		return {
			album: album as AlbumDoc,
			artist: artist as ArtistDoc,
		};
	},
});

export const queryArtistAlbumsByAlbumId = query({
	args: {
		paginationOpts: paginationOptsValidator,
		albumId: v.id("album"),
	},
	handler: async (ctx, args) => {
		await getUserIdOrThrow(ctx);

		const album = await getDocOrThrow(ctx, args.albumId);

		const albums = await ctx.db
			.query("album")
			.withIndex("albumArtist", (q) => q.eq("artistId", album.artistId))
			.paginate(args.paginationOpts);

		const artistMap = await getUniqueArtistsMap(ctx, albums.page);

		return { ...albums, page: matchAlbumData(albums.page, artistMap) };
	},
});

export const queryAlbumsByTerm = query({
	args: {
		paginationOpts: paginationOptsValidator,
		term: v.string(),
	},
	handler: async (ctx, args) => {
		await getUserIdOrThrow(ctx);

		const albums = await ctx.db
			.query("album")
			.withSearchIndex("albumSearch", (q) => q.search("title", args.term))
			.paginate(args.paginationOpts);

		const artistMap = await getUniqueArtistsMap(ctx, albums.page);

		return { ...albums, page: matchAlbumData(albums.page, artistMap) };
	},
});

export const patchAlbumMutation = mutation({
	args: {
		albumId: v.id("album"),
		title: v.string(),
		year: v.number(),
	},
	handler: async (ctx, { albumId, title, year }) => {
		await getUserIdOrThrow(ctx);

		return ctx.db.patch(albumId, { title, year });
	},
});
