import { createFileRoute, useSearch } from "@tanstack/react-router";
import * as v from "valibot";
import { SearchAlbumsList } from "~/modules/albums/components/album-lists/search-albums-list";
import { getSearchAlbumsQueryOptions } from "~/modules/albums/server/albums";

const RouteComponent = () => {
	const params = useSearch({ from: "/albums/search" });

	return <SearchAlbumsList term={params.term} />;
};

export const Route = createFileRoute("/albums/search")({
	validateSearch: v.object({ term: v.optional(v.string(), "") }),
	component: RouteComponent,
	loaderDeps: ({ search: { term } }) => ({ term }),
	loader: async ({ context, deps }) => {
		await context.queryClient.ensureInfiniteQueryData(
			getSearchAlbumsQueryOptions({
				...deps,
				queryClient: context.queryClient,
			}),
		);
	},
});
