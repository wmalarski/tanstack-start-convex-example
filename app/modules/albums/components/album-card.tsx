import { Link } from "@tanstack/react-router";
import type { AlbumDoc, ArtistDoc } from "convex/utils";
import {
	Card,
	CardContent, CardFooter,
	CardHeader,
	CardTitle
} from "~/ui/card";
import { formatAlbumTitle } from "../utils/format";
import { AlbumActions } from "./album-actions/album-actions";
import { AlbumCoversCarousel } from "./album-covers-carousel";

export type AlbumCardData = {
	artist: ArtistDoc;
	album: AlbumDoc;
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
					<CardTitle>{formatAlbumTitle(data)}</CardTitle>
				</CardHeader>
				<CardContent>
					<AlbumCoversCarousel album={data.album} size="s250" />
				</CardContent>
				<CardFooter>
					<AlbumActions album={data.album} artist={data.artist} />
				</CardFooter>
			</Card>
		</li>
	);
};
