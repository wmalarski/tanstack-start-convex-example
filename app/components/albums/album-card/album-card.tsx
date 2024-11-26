import { Link } from "@tanstack/react-router";
import type { Doc } from "convex/_generated/dataModel";
import type { IdAsString } from "convex/utils";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { AlbumCoversCarousel } from "../album-covers-carousel";

export type AlbumCardData = {
	artist: IdAsString<Doc<"artist">>;
	album: IdAsString<Doc<"album">>;
};

type AlbumCardProps = {
	data: AlbumCardData;
};

export const AlbumCard = ({ data }: AlbumCardProps) => {
	return (
		<li>
			<Card className="relative">
				<Link
					to="/albums/$albumId"
					params={{ albumId: data.album._id }}
					className="absolute inset-0"
					aria-label="Details"
				/>
				<CardHeader>
					<CardTitle>Card Title</CardTitle>
					<CardDescription>Card Description</CardDescription>
				</CardHeader>
				<CardContent>
					<AlbumCoversCarousel album={data.album} />
					<pre>{JSON.stringify(data, null, 2)}</pre>
				</CardContent>
				<CardFooter>
					<p>Card Footer</p>
				</CardFooter>
			</Card>
		</li>
	);
};
