import fs from "node:fs/promises";

const readArtistJsonlFile = async () => {
	const artistJsonlPath =
		"scripts/snapshot_decisive-cuttlefish-338_1732449589346228831/artist/documents.jsonl";

	const artistJsonlFile = await fs.readFile(artistJsonlPath, {
		encoding: "utf8",
	});

	const idMap = new Map<string, string>();

	artistJsonlFile.split("\n").forEach((line) => {
		if (line.length < 1) {
			return;
		}

		const parsed = JSON.parse(line);
		idMap.set(parsed.id, parsed._id);
	});

	return idMap;
};

const readAlbumsImportFile = async () => {
	const albumsJsonPath = "scripts/albums.json";

	const artistJsonlFile = await fs.readFile(albumsJsonPath, {
		encoding: "utf8",
	});

	return JSON.parse(artistJsonlFile);
};

type Album = {
	artistId: string;
};

const replaceArtistIds = (idMap: Map<string, string>, albums: Album[]) => {
	return albums.map((album) => ({
		...album,
		artistId: idMap.get(album.artistId),
		random: String(Math.floor(Math.random() * 1e18)),
	}));
};

const matchIds = async () => {
	const artistJsonlData = await readArtistJsonlFile();
	const albumImportData = await readAlbumsImportFile();
	const replaced = replaceArtistIds(artistJsonlData, albumImportData);

	console.log(replaced.length);

	await fs.writeFile(
		"scripts/matched-albums.json",
		JSON.stringify(replaced, null, 2),
	);
};

matchIds();
