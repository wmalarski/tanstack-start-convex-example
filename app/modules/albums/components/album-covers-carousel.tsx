import type { Doc } from "convex/_generated/dataModel";
import type { IdAsString } from "convex/utils";
import { Card, CardContent } from "~/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "~/ui/carousel";

type AlbumCoversCarouselProps = {
	album: IdAsString<Doc<"album">>;
};

export const AlbumCoversCarousel = ({ album }: AlbumCoversCarouselProps) => {
	return (
		<Carousel className="w-full max-w-xs">
			<CarouselContent>
				{album.covers?.s250?.map((cover) => (
					<CarouselItem key={cover}>
						<div className="p-1">
							<Card>
								<CardContent className="flex aspect-square items-center justify-center p-6">
									<span className="font-semibold text-4xl">{cover}</span>
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
