import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import {
	getDocOrThrow,
	getUniqueAlbums,
	getUniqueArtistsMap,
	getUserIdOrThrow,
	matchReviewData,
	type ReviewDoc,
} from "./utils";

export const queryReview = query({
	args: { reviewId: v.id("review") },
	handler: async (ctx, args) => {
		await getUserIdOrThrow(ctx);

		const review = await getDocOrThrow(ctx, args.reviewId);

		return review as ReviewDoc;
	},
});

export const queryReviews = query({
	args: { paginationOpts: paginationOptsValidator },
	handler: async (ctx, args) => {
		const userId = await getUserIdOrThrow(ctx);

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
		await getUserIdOrThrow(ctx);

		const album = await getDocOrThrow(ctx, args.albumId);

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

export const createReviewMutation = mutation({
	args: {
		albumId: v.id("album"),
		text: v.string(),
		rate: v.number(),
	},
	handler: async (ctx, args) => {
		const userId = await getUserIdOrThrow(ctx);

		return ctx.db.insert("review", { ...args, userId }) as Promise<string>;
	},
});

export const patchReviewMutation = mutation({
	args: {
		reviewId: v.id("review"),
		text: v.string(),
		rate: v.number(),
	},
	handler: async (ctx, { rate, reviewId, text }) => {
		const userId = await getUserIdOrThrow(ctx);
		const review = await getDocOrThrow(ctx, reviewId);

		if (review.userId !== userId) {
			throw new ConvexError("User is unauthorized");
		}

		return ctx.db.patch(review._id, { text, rate });
	},
});

export const deleteReviewMutation = mutation({
	args: { reviewId: v.id("review") },
	handler: async (ctx, args) => {
		const userId = await getUserIdOrThrow(ctx);
		const review = await getDocOrThrow(ctx, args.reviewId);

		if (userId !== review.userId) {
			throw new ConvexError("User is unauthorized");
		}

		return ctx.db.delete(args.reviewId);
	},
});
