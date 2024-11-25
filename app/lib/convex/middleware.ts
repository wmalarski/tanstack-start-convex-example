import { createMiddleware } from "@tanstack/start";
import { ConvexHttpClient } from "convex/browser";
import { getSessionJwtToken } from "../auth/session";

export const convexMiddleware = createMiddleware().server(({ next }) => {
	const CONVEX_URL = import.meta.env.VITE_CONVEX_URL;
	const convexClient = new ConvexHttpClient(CONVEX_URL);

	const authToken = getSessionJwtToken();
	if (authToken) {
		convexClient.setAuth(authToken);
	}

	return next({ context: { convexClient, authToken } });
});

export const convexAuthorizedMiddleware = createMiddleware()
	.middleware([convexMiddleware])
	.server(({ next, context }) => {
		if (!context.authToken) {
			throw new Error("Unauthorized access");
		}

		return next({ context: { requiredToken: context.authToken } });
	});
