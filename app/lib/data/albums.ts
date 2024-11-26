import { infiniteQueryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";
import { api } from "convex/_generated/api";
import * as v from "valibot";
import { DEFAULT_PAGE_SIZE } from "../common/constants";
import { convexAuthorizedMiddleware } from "../convex/middleware";
import { paginationSchema, serializeAlbumData } from "./utils";

const getRandomAlbums = createServerFn({ method: "GET" })
	.middleware([convexAuthorizedMiddleware])
	.validator(v.object({ paginationOpts: paginationSchema }))
	.handler(async ({ context, data }) => {
		const response = await context.convexClient.query(
			api.albums.queryRandomAlbums,
			data,
		);

		return { ...response, page: serializeAlbumData(response.page) };
	});

export const getRandomAlbumsQueryOptions = () => {
	return infiniteQueryOptions({
		queryKey: ["random-albums"],
		queryFn: ({ pageParam }) =>
			getRandomAlbums({
				data: {
					paginationOpts: {
						cursor: pageParam,
						numItems: DEFAULT_PAGE_SIZE,
					},
				},
			}),
		getNextPageParam: (lastPage) => lastPage.continueCursor,
		initialPageParam: null as string | null,
	});
};
