import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import {
	type BookmarkDoc,
	getDocOrThrow,
	getUniqueAlbums,
	getUniqueArtistsMap,
	getUserIdOrThrow,
	matchBookmarkData,
} from "./utils";

export const queryBookmarks = query({
	args: { paginationOpts: paginationOptsValidator },
	handler: async (ctx, args) => {
		const userId = await getUserIdOrThrow(ctx);

		const bookmarks = await ctx.db
			.query("bookmark")
			.withIndex("bookmarkUsersAlbums", (q) => q.eq("userId", userId))
			.order("desc")
			.paginate(args.paginationOpts);

		const { albums, albumMap } = await getUniqueAlbums(ctx, bookmarks.page);
		const artistMap = await getUniqueArtistsMap(ctx, albums);

		return {
			...bookmarks,
			page: matchBookmarkData(bookmarks.page, albumMap, artistMap),
		};
	},
});

export const queryBookmark = query({
	args: { albumId: v.id("album") },
	handler: async (ctx, args) => {
		const userId = await getUserIdOrThrow(ctx);

		const bookmark = await ctx.db
			.query("bookmark")
			.withIndex("bookmarkUsersAlbums", (q) =>
				q.eq("userId", userId).eq("albumId", args.albumId),
			)
			.first();

		return bookmark as BookmarkDoc | null;
	},
});

export const createBookmarkMutation = mutation({
	args: { albumId: v.id("album") },
	handler: async (ctx, args) => {
		const userId = await getUserIdOrThrow(ctx);

		return ctx.db.insert("bookmark", { ...args, userId }) as Promise<string>;
	},
});

export const deleteBookmarkMutation = mutation({
	args: { bookmarkId: v.id("bookmark") },
	handler: async (ctx, args) => {
		const userId = await getUserIdOrThrow(ctx);
		const bookmark = await getDocOrThrow(ctx, args.bookmarkId);

		if (userId !== bookmark.userId) {
			throw new ConvexError("User is unauthorized");
		}

		return ctx.db.delete(args.bookmarkId);
	},
});
