import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	artist: defineTable({
		createdAt: v.number(),
		name: v.string(),
		sid: v.optional(v.string()),
	}),
	album: defineTable({
		artistId: v.id("artist"),
		covers: v.object({}),
		createdAt: v.number(),
		release: v.optional(v.string()),
		sid: v.optional(v.string()),
		title: v.string(),
		year: v.optional(v.number()),
	}),
	review: defineTable({
		albumId: v.id("album"),
		createdAt: v.number(),
		rate: v.number(),
		text: v.string(),
	}),
	bookmark: defineTable({
		albumId: v.id("album"),
		createdAt: v.number(),
	}),
});
