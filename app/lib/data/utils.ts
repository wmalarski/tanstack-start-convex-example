import type { PaginationResult } from "convex/server";
import * as v from "valibot";

export const paginationSchema = v.object({
	id: v.optional(v.number()),
	endCursor: v.optional(v.nullable(v.string())),
	maximumRowsRead: v.optional(v.number()),
	maximumBytesRead: v.optional(v.number()),
	numItems: v.number(),
	cursor: v.nullable(v.string()),
});

export const paginationPageParamOptions = {
	initialPageParam: null as string | null,
	getNextPageParam: (lastPage: PaginationResult<unknown>) => {
		return lastPage.isDone ? null : lastPage.continueCursor;
	},
};
