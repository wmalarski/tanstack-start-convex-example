import { Link } from "@tanstack/react-router";
import type { AlbumDoc, ArtistDoc } from "convex/utils";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/ui/card";
import { formatAlbumTitle } from "../utils/format";
import { AlbumActions } from "./album-actions/album-actions";
import { AlbumContextProvider } from "./album-context";
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
			<AlbumContextProvider {...data}>
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
						<AlbumCoversCarousel size="s250" />
					</CardContent>
					<CardFooter>
						<AlbumActions />
					</CardFooter>
				</Card>
			</AlbumContextProvider>
		</li>
	);
};
