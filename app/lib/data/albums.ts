import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";
import { api } from "convex/_generated/api";
import type { Doc, Id } from "convex/_generated/dataModel";
import type { IdAsString } from "convex/utils";
import * as v from "valibot";
import { DEFAULT_PAGE_SIZE } from "../common/constants";
import { convexAuthorizedMiddleware } from "../convex/middleware";
import { paginationPageParamOptions, paginationSchema } from "./utils";

const getRandomAlbums = createServerFn({ method: "GET" })
	.middleware([convexAuthorizedMiddleware])
	.validator(v.object({ paginationOpts: paginationSchema }))
	.handler(async ({ context, data }) =>
		context.convexClient.query(api.albums.queryRandomAlbums, data),
	);

export const getRandomAlbumsQueryOptions = () => {
	return infiniteQueryOptions({
		...paginationPageParamOptions,
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
};

export const getArtistAlbumsQueryOptions = (
	args: GetArtistAlbumsQueryOptionsArgs,
) => {
	return infiniteQueryOptions({
		...paginationPageParamOptions,
		queryKey: ["artist-albums"],
		queryFn: ({ pageParam }) =>
			getArtistAlbums({
				data: {
					...args,
					paginationOpts: {
						cursor: pageParam,
						numItems: DEFAULT_PAGE_SIZE,
					},
				},
			}),
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
};

export const getSearchAlbumsQueryOptions = (
	args: GetSearchAlbumsQueryOptionsArgs,
) => {
	return infiniteQueryOptions({
		...paginationPageParamOptions,
		queryKey: ["search-albums"],
		queryFn: ({ pageParam }) =>
			getSearchAlbums({
				data: {
					...args,
					paginationOpts: {
						cursor: pageParam,
						numItems: DEFAULT_PAGE_SIZE,
					},
				},
			}),
	});
};

const getAlbum = createServerFn({ method: "GET" })
	.middleware([convexAuthorizedMiddleware])
	.validator(v.object({ albumId: v.string() }))
	.handler(
		async ({ context, data }) =>
			context.convexClient.query(api.albums.queryAlbum, {
				albumId: data.albumId as Id<"album">,
			}) as Promise<IdAsString<Doc<"album">>>,
	);

type GetAlbumQueryOptionsArgs = {
	albumId: string;
};

export const getAlbumQueryOptions = (args: GetAlbumQueryOptionsArgs) => {
	return queryOptions({
		...paginationPageParamOptions,
		queryKey: ["album", args.albumId],
		queryFn: () => getAlbum({ data: args }),
	});
};
