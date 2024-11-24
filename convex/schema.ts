import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	...authTables,
	artist: defineTable({
		name: v.string(),
		sid: v.union(v.string(), v.null()),
		id: v.string(),
	}).searchIndex("artistSearch", { searchField: "name" }),
	album: defineTable({
		artistId: v.id("artist"),
		covers: v.union(
			v.object({
				s1200: v.optional(v.array(v.string())),
				s250: v.optional(v.array(v.string())),
				s500: v.optional(v.array(v.string())),
				large: v.optional(v.array(v.string())),
				small: v.optional(v.array(v.string())),
			}),
			v.null(),
		),
		release: v.union(v.string(), v.null()),
		sid: v.union(v.string(), v.null()),
		title: v.string(),
		year: v.optional(v.number()),
		id: v.string(),
		random: v.optional(v.string()),
	})
		.searchIndex("albumSearch", { searchField: "title" })
		.searchIndex("albumRandom", { searchField: "random" }),
	review: defineTable({
		albumId: v.id("album"),
		rate: v.number(),
		text: v.string(),
		userId: v.id("users"),
	}).index("reviewUsers", ["userId"]),
	bookmark: defineTable({
		albumId: v.id("album"),
		userId: v.id("users"),
	}).index("bookmarkUsers", ["userId"]),
});
