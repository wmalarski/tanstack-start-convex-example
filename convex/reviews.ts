import { getAuthUserId } from "@convex-dev/auth/server";
import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";
import { getUniqueAlbums, getUniqueArtistsMap, matchReviewData } from "./utils";

export const queryReviews = query({
	args: { paginationOpts: paginationOptsValidator },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);

		if (!userId) {
			throw new ConvexError("User is unauthorized");
		}

		const reviews = await ctx.db
			.query("review")
			.withIndex("reviewUsers", (q) => q.eq("userId", userId))
			.order("desc")
			.paginate(args.paginationOpts);

		const { albums, albumMap } = await getUniqueAlbums(ctx, reviews.page);
		const artistMap = await getUniqueArtistsMap(ctx, albums);

		return {
			...reviews,
			page: matchReviewData(reviews.page, albumMap, artistMap),
		};
	},
});

export const queryReviewsByArtistAlbumId = query({
	args: { paginationOpts: paginationOptsValidator, albumId: v.id("album") },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);

		if (!userId) {
			throw new ConvexError("User is unauthorized");
		}

		const album = await ctx.db.get(args.albumId);

		if (!album) {
			throw new ConvexError("Invalid albumId");
		}

		const albums = await ctx.db
			.query("album")
			.withIndex("albumArtist", (q) => q.eq("artistId", album.artistId))
			.collect();

		const albumMap = new Map(albums.map((album) => [album._id, album]));
		const artistMap = await getUniqueArtistsMap(ctx, albums);

		const reviews = await ctx.db
			.query("review")
			.filter((q) =>
				q.or(...albums.map((album) => q.eq(q.field("albumId"), album._id))),
			)
			.order("desc")
			.paginate(args.paginationOpts);

		return {
			...reviews,
			page: matchReviewData(reviews.page, albumMap, artistMap),
		};
	},
});