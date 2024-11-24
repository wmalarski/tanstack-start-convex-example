import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";

export const queryRandomAlbums = query({
	args: { take: v.number() },
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
			.take(args.take);

		const withoutReviews = albums.filter(
			(album) => !reviewedAlbumIds.has(album._id),
		);

		return withoutReviews;
	},
});

export const queryAlbum = query({
	args: { albumId: v.id("album") },
	handler: async (ctx, args) => {
		return ctx.db.get(args.albumId);
	},
});

export const queryArtistAlbumsByAlbumId = query({
	args: { albumId: v.id("album") },
	handler: async (ctx, args) => {
		const album = await ctx.db.get(args.albumId);

		if (!album) {
			throw new ConvexError("Invalid albumId");
		}

		return ctx.db
			.query("album")
			.withIndex("albumArtist", (q) => q.eq("artistId", album.artistId))
			.collect();
	},
});
