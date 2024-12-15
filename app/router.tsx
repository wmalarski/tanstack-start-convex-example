import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { DefaultCatchBoundary } from "./modules/common/components/default-catch-boundary";
import { NotFound } from "./modules/common/components/not-found";
import { routeTree } from "./routeTree.gen";

export const createRouter = () => {
	const CONVEX_URL = import.meta.env.VITE_CONVEX_URL;

	if (!CONVEX_URL) {
		throw new Error("missing env var VITE_CONVEX_URL");
	}

	const queryClient = new QueryClient();

	const router = routerWithQueryClient(
		createTanStackRouter({
			routeTree,
			defaultPreload: "intent",
			context: { queryClient },
			defaultErrorComponent: DefaultCatchBoundary,
			defaultNotFoundComponent: () => <NotFound />,
			defaultSsr: false,
		}),
		queryClient,
	);

	return router;
};

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}
