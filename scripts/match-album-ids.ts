import fs from "node:fs/promises";

const readAlbumJsonlFile = async () => {
	const albumJsonlPath =
		"scripts/snapshot_decisive-cuttlefish-338_1732452450415274433/album/documents.jsonl";

	const albumJsonlFile = await fs.readFile(albumJsonlPath, {
		encoding: "utf8",
	});

	const idMap = new Map<string, string>();

	albumJsonlFile.split("\n").forEach((line) => {
		if (line.length < 1) {
			return;
		}

		const parsed = JSON.parse(line);
		idMap.set(parsed.id, parsed._id);
	});

	return idMap;
};

const readReviewsImportFile = async () => {
	const reviewsJsonPath = "scripts/reviews.json";

	const reviewsJsonFile = await fs.readFile(reviewsJsonPath, {
		encoding: "utf8",
	});

	return JSON.parse(reviewsJsonFile);
};

type Review = {
	albumId: string;
};

const replaceArtistIds = (idMap: Map<string, string>, reviews: Review[]) => {
	return reviews.map((album) => ({
		...album,
		albumId: idMap.get(album.albumId),
	}));
};

const matchIds = async () => {
	const idsMap = await readAlbumJsonlFile();
	const reviews = await readReviewsImportFile();
	const replaced = replaceArtistIds(idsMap, reviews);

	await fs.writeFile(
		"scripts/matched-reviews.json",
		JSON.stringify(replaced, null, 2),
	);
};

matchIds();
