import {
	Outlet,
	ScrollRestoration,
	createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Meta, Scripts } from "@tanstack/start";
import type { PropsWithChildren } from "react";
import { DefaultCatchBoundary } from "~/components/common/default-catch-boundary";
import { NotFound } from "~/components/common/not-found";
import appCss from "~/styles/app.css?url";
import { seo } from "~/utils/seo";

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

export const Route = createRootRoute({
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
