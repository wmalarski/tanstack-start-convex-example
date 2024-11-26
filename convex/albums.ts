import { getAuthUserId } from "@convex-dev/auth/server";
import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";
import {
	type AlbumDoc,
	type ArtistDoc,
	getUniqueArtistsMap,
	matchAlbumData,
} from "./utils";

export const queryRandomAlbums = query({
	args: { paginationOpts: paginationOptsValidator },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);

		if (!userId) {
			throw new ConvexError("User is unauthorized");
		}

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
		const album = await ctx.db.get(args.albumId);

		if (!album) {
			throw new ConvexError("Invalid albumId");
		}

		const artist = await ctx.db.get(album.artistId);

		if (!artist) {
			throw new ConvexError("Invalid albumId");
		}

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
		const album = await ctx.db.get(args.albumId);

		if (!album) {
			throw new ConvexError("Invalid albumId");
		}

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
		const albums = await ctx.db
			.query("album")
			.withSearchIndex("albumSearch", (q) => q.search("title", args.term))
			.paginate(args.paginationOpts);

		const artistMap = await getUniqueArtistsMap(ctx, albums.page);

		return { ...albums, page: matchAlbumData(albums.page, artistMap) };
	},
});
