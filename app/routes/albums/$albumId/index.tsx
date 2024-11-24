import { createFileRoute, useParams } from "@tanstack/react-router";

const RouteComponent = () => {
	const params = useParams({ from: "/albums/$albumId/" });

	return (
		<div>
			'Hello /albums/$albumId/!'
			<pre>{JSON.stringify(params, null, 2)}</pre>
		</div>
	);
};

export const Route = createFileRoute("/albums/$albumId/")({
	component: RouteComponent,
});
