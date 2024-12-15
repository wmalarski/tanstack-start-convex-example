import {
	infiniteQueryOptions,
	type QueryClient,
	queryOptions,
} from "@tanstack/react-query";
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

const getRandomAlbums = createServerFn({ method: "GET" })
	.middleware([convexAuthorizedMiddleware])
	.validator(v.object({ paginationOpts: paginationSchema }))
	.handler(async ({ context, data }) =>
		context.convexClient.query(api.albums.queryRandomAlbums, data),
	);

export const getRandomAlbumsQueryOptions = (queryClient: QueryClient) => {
	return infiniteQueryOptions({
		...paginationPageParamOptions,
		queryKey: ["random-albums"],
		queryFn: async ({ pageParam }) => {
			const results = await getRandomAlbums({
				data: {
					paginationOpts: {
						cursor: pageParam,
						numItems: DEFAULT_PAGE_SIZE,
					},
				},
			});

			setAlbumsQueryData(queryClient, results.page);

			return results;
		},
	});
};

const getArtistAlbums = createServerFn({ method: "GET" })
	.middleware([convexAuthorizedMiddleware])
	.validator(
		v.object({ paginationOpts: paginationSchema, albumId: v.string() }),
	)
	.handler(async ({ context, data }) =>
		context.convexClient.query(api.albums.queryArtistAlbumsByAlbumId, {
			...data,
			albumId: data.albumId as Id<"album">,
		}),
	);

type GetArtistAlbumsQueryOptionsArgs = {
	albumId: string;
	queryClient: QueryClient;
};

export const getArtistAlbumsQueryOptions = ({
	queryClient,
	...args
}: GetArtistAlbumsQueryOptionsArgs) => {
	return infiniteQueryOptions({
		...paginationPageParamOptions,
		queryKey: ["artist-albums"],
		queryFn: async ({ pageParam }) => {
			const results = await getArtistAlbums({
				data: {
					...args,
					paginationOpts: {
						cursor: pageParam,
						numItems: DEFAULT_PAGE_SIZE,
					},
				},
			});

			setAlbumsQueryData(queryClient, results.page);

			return results;
		},
	});
};

const getSearchAlbums = createServerFn({ method: "GET" })
	.middleware([convexAuthorizedMiddleware])
	.validator(v.object({ paginationOpts: paginationSchema, term: v.string() }))
	.handler(async ({ context, data }) =>
		context.convexClient.query(api.albums.queryAlbumsByTerm, data),
	);

type GetSearchAlbumsQueryOptionsArgs = {
	term: string;
	queryClient: QueryClient;
};

export const getSearchAlbumsQueryOptions = ({
	queryClient,
	...args
}: GetSearchAlbumsQueryOptionsArgs) => {
	return infiniteQueryOptions({
		...paginationPageParamOptions,
		queryKey: ["search-albums"],
		queryFn: async ({ pageParam }) => {
			const results = await getSearchAlbums({
				data: {
					...args,
					paginationOpts: {
						cursor: pageParam,
						numItems: DEFAULT_PAGE_SIZE,
					},
				},
			});

			setAlbumsQueryData(queryClient, results.page);

			return results;
		},
	});
};

const getAlbum = createServerFn({ method: "GET" })
	.middleware([convexAuthorizedMiddleware])
	.validator(v.object({ albumId: v.string() }))
	.handler(async ({ context, data }) =>
		context.convexClient.query(api.albums.queryAlbum, {
			albumId: data.albumId as Id<"album">,
		}),
	);

type GetAlbumResult = Awaited<ReturnType<typeof getAlbum>>;

type GetAlbumQueryOptionsArgs = {
	albumId: string;
};

export const getAlbumQueryOptions = (args: GetAlbumQueryOptionsArgs) => {
	return queryOptions({
		queryKey: ["album", args.albumId],
		queryFn: () => getAlbum({ data: args }),
	});
};

const setAlbumsQueryData = (
	queryClient: QueryClient,
	results: GetAlbumResult[],
) => {
	for (const result of results) {
		queryClient.setQueryData(
			getAlbumQueryOptions({ albumId: result.album._id }).queryKey,
			result,
		);
	}
};

export const patchAlbumMutation = createServerFn({ method: "POST" })
	.middleware([convexAuthorizedMiddleware])
	.validator(
		v.object({
			albumId: v.string(),
			title: v.string(),
			year: v.number(),
		}),
	)
	.handler(async ({ context, data }) =>
		context.convexClient.mutation(api.albums.patchAlbumMutation, {
			...data,
			albumId: data.albumId as Id<"album">,
		}),
	);
