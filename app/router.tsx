import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexQueryClient } from "@convex-dev/react-query";
import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { ConvexReactClient } from "convex/react";
import { DefaultCatchBoundary } from "./components/common/default-catch-boundary";
import { NotFound } from "./components/common/not-found";
import { routeTree } from "./routeTree.gen";

// const createCookieStorage = (): TokenStorage => {
// 	return {
// 		getItem(key) {
// 				//
// 		},
// 		removeItem(key) {
// 				//
// 		},
// 		setItem(key, value) {
// 				//
// 		},
// 	}
// }

export function createRouter() {
	const CONVEX_URL = import.meta.env.VITE_CONVEX_URL;

	if (!CONVEX_URL) {
		throw new Error("missing env var VITE_CONVEX_URL");
	}

	const convex = new ConvexReactClient(CONVEX_URL);
	const convexQueryClient = new ConvexQueryClient(convex);

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				queryKeyHashFn: convexQueryClient.hashFn(),
				queryFn: convexQueryClient.queryFn(),
			},
		},
	});
	convexQueryClient.connect(queryClient);

	const router = routerWithQueryClient(
		createTanStackRouter({
			routeTree,
			defaultPreload: "intent",
			context: { queryClient, convex },
			defaultErrorComponent: DefaultCatchBoundary,
			defaultNotFoundComponent: () => <NotFound />,
			Wrap: ({ children }) => {
				return (
					<ConvexAuthProvider client={convexQueryClient.convexClient}>
						{children}
					</ConvexAuthProvider>
				);
			},
		}),
		queryClient,
	);

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}
