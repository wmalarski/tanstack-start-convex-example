import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";
import { api } from "convex/_generated/api";
import * as v from "valibot";
import {
	convexAuthorizedMiddleware,
	convexMiddleware,
} from "~/modules/common/server/middleware";
import { clearSessionTokens, setSessionTokens } from "./session";

export const getSessionCookie = createServerFn({ method: "GET" })
	.middleware([convexMiddleware])
	.handler(({ context }) => {
		return context.authToken;
	});

export const getSessionQueryOptions = () => {
	return queryOptions({
		queryKey: ["session"],
		queryFn: () => getSessionCookie(),
	});
};

export const getUser = createServerFn({ method: "GET" })
	.middleware([convexMiddleware])
	.handler(async ({ context }) => {
		const user = await context.convexClient.query(api.auth.queryAuthUser);

		return user && { ...user, _id: user._id as string };
	});

export const getUserQueryOptions = () => {
	return queryOptions({
		queryKey: ["user"],
		queryFn: () => getUser(),
	});
};

export const signInMutation = createServerFn({ method: "POST" })
	.middleware([convexMiddleware])
	.validator(
		v.object({
			email: v.string(),
			password: v.string(),
			flow: v.union([
				v.literal("signUp"),
				v.literal("signIn"),
				v.literal("reset"),
				v.literal("reset-verification"),
				v.literal("email-verification"),
			]),
		}),
	)
	.handler(async ({ context, data }) => {
		const result = await context.convexClient.action(api.auth.signIn, {
			provider: "password",
			params: data,
		});

		if (result.tokens) {
			setSessionTokens(result.tokens);
		}

		return result.started;
	});

export const signOutMutation = createServerFn({ method: "POST" })
	.middleware([convexAuthorizedMiddleware])
	.handler(async ({ context }) => {
		await context.convexClient.action(api.auth.signOut);
		clearSessionTokens();
	});
