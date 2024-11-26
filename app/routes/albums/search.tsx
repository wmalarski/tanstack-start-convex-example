import { createFileRoute, useSearch } from "@tanstack/react-router";
import * as v from "valibot";
import { SearchAlbumsList } from "~/modules/albums/components/album-lists/search-albums-list";

const RouteComponent = () => {
	const params = useSearch({ from: "/albums/search" });

	return <SearchAlbumsList term={params.term} />;
};

const searchSchema = v.object({
	term: v.optional(v.string(), ""),
});

export const Route = createFileRoute("/albums/search")({
	validateSearch: searchSchema,
	component: RouteComponent,
});
