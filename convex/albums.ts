import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";

export const queryRandomAlbums = query({
	args: {
		take: v.number(),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);

		if (!userId) {
			throw new ConvexError("User is unauthorized");
		}

		const reviews = await ctx.db
			.query("review")
			.withIndex("reviewUsers", (q) => q.eq("userId", userId))
			.collect();

		// const page = await ctx.db.query("album").fullTableScan().take(1);
		// page

		const reviewedAlbumIds = new Set(reviews.map((review) => review.albumId));
		const albums = await ctx.db.query("album").collect();

		const withoutReviews = albums.filter(
			(album) => !reviewedAlbumIds.has(album._id),
		);

		const randomAlbums = Array.from({ length: args.take }, () =>
			Math.floor(Math.random() * withoutReviews.length),
		).map((index) => withoutReviews[index]);

		return randomAlbums;
	},
});

export const queryAlbum = query({
	args: { albumId: v.id("album") },
	handler: async (ctx, args) => {
		return ctx.db.get(args.albumId);
	},
});
