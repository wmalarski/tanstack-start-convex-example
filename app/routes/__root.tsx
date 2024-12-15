import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	Outlet,
	ScrollRestoration,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Meta, Scripts } from "@tanstack/start";
import type { PropsWithChildren } from "react";
import { DefaultCatchBoundary } from "~/modules/common/components/default-catch-boundary";
import { NotFound } from "~/modules/common/components/not-found";
import { seo } from "~/modules/common/utils/seo";
import appCss from "~/styles/app.css?url";

export const RootDocument = ({ children }: PropsWithChildren) => {
	return (
		<html lang="en">
			<head>
				<Meta />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<TanStackRouterDevtools position="bottom-right" />
				<ReactQueryDevtools />
				<Scripts />
			</body>
		</html>
	);
};

export const RootComponent = () => {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
};

type RouteContext = {
	queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouteContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			...seo({
				title: "Tanstack Start Albums",
				description: "Tanstack Start Albums is a example app.",
			}),
		],
		links: [{ rel: "stylesheet", href: appCss }],
	}),
	errorComponent: (props) => {
		return (
			<RootDocument>
				<DefaultCatchBoundary {...props} />
			</RootDocument>
		);
	},
	notFoundComponent: () => <NotFound />,
	component: RootComponent,
});
