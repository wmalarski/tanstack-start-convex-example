import { getAuthUserId } from "@convex-dev/auth/server";
import { paginationOptsValidator } from "convex/server";
import { ConvexError } from "convex/values";
import { query } from "./_generated/server";
import {
	getUniqueAlbums,
	getUniqueArtistsMap,
	matchBookmarkData,
} from "./utils";

export const queryBookmarks = query({
	args: { paginationOpts: paginationOptsValidator },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);

		if (!userId) {
			throw new ConvexError("User is unauthorized");
		}

		const reviews = await ctx.db
			.query("bookmark")
			.withIndex("bookmarkUsers", (q) => q.eq("userId", userId))
			.order("desc")
			.paginate(args.paginationOpts);

		const { albums, albumMap } = await getUniqueAlbums(ctx, reviews.page);
		const artistMap = await getUniqueArtistsMap(ctx, albums);

		return {
			...reviews,
			page: matchBookmarkData(reviews.page, albumMap, artistMap),
		};
	},
});
