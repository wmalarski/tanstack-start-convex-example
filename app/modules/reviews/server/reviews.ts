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

const getReview = createServerFn({ method: "GET" })
	.middleware([convexAuthorizedMiddleware])
	.validator(v.object({ reviewId: v.string() }))
	.handler(({ context, data }) =>
		context.convexClient.query(api.reviews.queryReview, {
			reviewId: data.reviewId as Id<"review">,
		}),
	);

type GetReviewQueryOptionsArgs = {
	reviewId: string;
};

export const getReviewQueryOptions = ({
	reviewId,
}: GetReviewQueryOptionsArgs) => {
	return queryOptions({
		queryKey: ["review", reviewId],
		queryFn: () => getReview({ data: { reviewId } }),
	});
};

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
					albumId,
					paginationOpts: {
						cursor: pageParam,
						numItems: DEFAULT_PAGE_SIZE,
					},
				},
			}),
	});
};

export const createReviewMutation = createServerFn({ method: "POST" })
	.middleware([convexAuthorizedMiddleware])
	.validator(
		v.object({
			albumId: v.string(),
			text: v.string(),
			rate: v.number(),
		}),
	)
	.handler(async ({ context, data }) =>
		context.convexClient.mutation(api.reviews.createReviewMutation, {
			...data,
			albumId: data.albumId as Id<"album">,
		}),
	);

export const patchReviewMutation = createServerFn({ method: "POST" })
	.middleware([convexAuthorizedMiddleware])
	.validator(
		v.object({
			reviewId: v.string(),
			text: v.string(),
			rate: v.number(),
		}),
	)
	.handler(async ({ context, data }) =>
		context.convexClient.mutation(api.reviews.patchReviewMutation, {
			...data,
			reviewId: data.reviewId as Id<"review">,
		}),
	);

export const removeReviewMutation = createServerFn({ method: "POST" })
	.middleware([convexAuthorizedMiddleware])
	.validator(v.object({ reviewId: v.string() }))
	.handler(async ({ context, data }) =>
		context.convexClient.mutation(api.reviews.deleteReviewMutation, {
			reviewId: data.reviewId as Id<"review">,
		}),
	);
