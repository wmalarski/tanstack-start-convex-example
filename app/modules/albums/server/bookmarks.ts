import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";
import * as v from "valibot";
import { convexAuthorizedMiddleware } from "~/modules/common/server/middleware";
import {
	DEFAULT_PAGE_SIZE,
	paginationPageParamOptions,
	paginationSchema,
} from "~/modules/common/utils/query-options";

const getAllBookmarks = createServerFn({ method: "GET" })
	.middleware([convexAuthorizedMiddleware])
	.validator(v.object({ paginationOpts: paginationSchema }))
	.handler(async ({ context, data }) =>
		context.convexClient.query(api.bookmarks.queryBookmarks, data),
	);

export const getAllBookmarksQueryOptions = () => {
	return infiniteQueryOptions({
		...paginationPageParamOptions,
		queryKey: ["all-bookmarks"],
		queryFn: ({ pageParam }) =>
			getAllBookmarks({
				data: {
					paginationOpts: {
						cursor: pageParam,
						numItems: DEFAULT_PAGE_SIZE,
					},
				},
			}),
	});
};

const getBookmark = createServerFn({ method: "GET" })
	.middleware([convexAuthorizedMiddleware])
	.validator(v.object({ albumId: v.string() }))
	.handler(async ({ context, data }) =>
		context.convexClient.query(api.bookmarks.queryBookmark, {
			albumId: data.albumId as Id<"album">,
		}),
	);

type GetBookmarkQueryOptionsArgs = {
	albumId: string;
};

export const getBookmarkQueryOptions = ({
	albumId,
}: GetBookmarkQueryOptionsArgs) => {
	return queryOptions({
		queryKey: ["bookmark", albumId],
		queryFn: () => getBookmark({ data: { albumId } }),
	});
};

export const createBookmarkMutation = createServerFn({ method: "POST" })
	.middleware([convexAuthorizedMiddleware])
	.validator(v.object({ albumId: v.string() }))
	.handler(async ({ context, data }) =>
		context.convexClient.mutation(api.bookmarks.createBookmarkMutation, {
			albumId: data.albumId as Id<"album">,
		}),
	);

export const deleteBookmarkMutation = createServerFn({ method: "POST" })
	.middleware([convexAuthorizedMiddleware])
	.validator(v.object({ bookmarkId: v.string() }))
	.handler(async ({ context, data }) =>
		context.convexClient.mutation(api.bookmarks.deleteBookmarkMutation, {
			bookmarkId: data.bookmarkId as Id<"bookmark">,
		}),
	);
