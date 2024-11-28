import type { AlbumDoc } from "convex/utils";
import { Card, CardContent } from "~/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "~/ui/carousel";

type AlbumCoversCarouselProps = {
	album: AlbumDoc;
	size: keyof NonNullable<AlbumDoc["covers"]>;
};

export const AlbumCoversCarousel = ({
	album,
	size,
}: AlbumCoversCarouselProps) => {
	const covers = album.covers?.[size];

	if (!covers || covers.length === 0) {
		return <div className="h-24 w-24 bg-gray" />;
	}

	return (
		<Carousel className="w-full max-w-xs">
			<CarouselContent>
				{covers.map((cover) => (
					<CarouselItem key={cover}>
						<div className="p-1">
							<Card>
								<CardContent className="flex aspect-square items-center justify-center p-6">
									<img src={cover} alt="Album cover" />
								</CardContent>
							</Card>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
};
