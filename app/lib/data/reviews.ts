import { infiniteQueryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";
import { api } from "convex/_generated/api";
import * as v from "valibot";
import { DEFAULT_PAGE_SIZE } from "../common/constants";
import { convexAuthorizedMiddleware } from "../convex/middleware";
import { paginationPageParamOptions, paginationSchema } from "./utils";

const getAllReviews = createServerFn({ method: "GET" })
	.middleware([convexAuthorizedMiddleware])
	.validator(v.object({ paginationOpts: paginationSchema }))
	.handler(async ({ context, data }) =>
		context.convexClient.query(api.reviews.queryReviews, data),
	);

export const getAllReviewsQueryOptions = () => {
	return infiniteQueryOptions({
		...paginationPageParamOptions,
		queryKey: ["all-reviews"],
		queryFn: ({ pageParam }) =>
			getAllReviews({
				data: {
					paginationOpts: {
						cursor: pageParam,
						numItems: DEFAULT_PAGE_SIZE,
					},
				},
			}),
	});
};

const getArtistReviews = createServerFn({ method: "GET" })
	.middleware([convexAuthorizedMiddleware])
	.validator(
		v.object({ paginationOpts: paginationSchema, albumId: v.string() }),
	)
	.handler(async ({ context, data }) =>
		context.convexClient.query(api.reviews.queryReviews, data),
	);

type GetArtistReviewsQueryOptionsArgs = {
	albumId: string;
};

export const getArtistReviewsQueryOptions = ({
	albumId,
}: GetArtistReviewsQueryOptionsArgs) => {
	return infiniteQueryOptions({
		...paginationPageParamOptions,
		queryKey: ["artist-reviews"],
		queryFn: ({ pageParam }) =>
			getArtistReviews({
				data: {
					paginationOpts: {
						cursor: pageParam,
						numItems: DEFAULT_PAGE_SIZE,
					},
					albumId,
				},
			}),
	});
};
