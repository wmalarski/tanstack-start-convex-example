import { getAuthUserId } from "@convex-dev/auth/server";
import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";
import type { Doc } from "./_generated/dataModel";
import { query } from "./_generated/server";

type ReviewData = {
	artist: Doc<"artist">;
	review: Doc<"review">;
	album: Doc<"album">;
};

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

		const albumIds = reviews.page.map((review) => review.albumId);
		const uniqueAlbumIds = [...new Set(albumIds)];

		const albums = await ctx.db
			.query("album")
			.filter((q) =>
				q.or(...uniqueAlbumIds.map((albumId) => q.eq(q.field("_id"), albumId))),
			)
			.collect();

		const albumMap = new Map(albums.map((album) => [album._id, album]));
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

		const artistMap = new Map(artists.map((artist) => [artist._id, artist]));

		const page: ReviewData[] = [];

		reviews.page.forEach((review) => {
			const album = albumMap.get(review.albumId);
			if (!album) {
				return;
			}

			const artist = artistMap.get(album.artistId);
			if (!artist) {
				return;
			}

			page.push({ album, artist, review });
		});

		return { ...reviews, page };
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

		const artist = await ctx.db.get(album.artistId);

		if (!artist) {
			throw new ConvexError("Invalid albumId");
		}

		const albums = await ctx.db
			.query("album")
			.withIndex("albumArtist", (q) => q.eq("artistId", album.artistId))
			.collect();

		const albumMap = new Map(albums.map((album) => [album._id, album]));

		const reviews = await ctx.db
			.query("review")
			.filter((q) =>
				q.or(...albums.map((album) => q.eq(q.field("albumId"), album._id))),
			)
			.order("desc")
			.paginate(args.paginationOpts);

		const page: ReviewData[] = [];

		reviews.page.forEach((review) => {
			const album = albumMap.get(review.albumId);

			if (!album) {
				return;
			}

			return { review, album, artist };
		});

		return { ...reviews, page };
	},
});
