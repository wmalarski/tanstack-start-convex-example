import { infiniteQueryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";
import { api } from "convex/_generated/api";
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
