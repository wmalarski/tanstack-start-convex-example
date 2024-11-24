import fs from "node:fs/promises";

export const loadDumpData = async () => {
	const file = await fs.readFile("scripts/dump.sql", { encoding: "utf8" });
	const lines = file.split("\n");

	const startRegex = /^COPY public\."([a-zA-Z]+)"/g;
	const endRegex = /^\\\.$/g;

	const detectedChanges = lines
		.map((line, index) => ({
			end: line.match(endRegex),
			index,
			start: line.match(startRegex),
		}))
		.filter((changes) => changes.start || changes.end);

	const ranges = Array.from({ length: detectedChanges.length / 2 }).map(
		(_, index) => {
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			const start = detectedChanges[index * 2]!;
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			const end = detectedChanges[index * 2 + 1]!;
			const table = start.start?.[0].match(/"(.+)"$/g)?.[0].replaceAll('"', "");
			return { end: end.index, table, start: start.index };
		},
	);

	const tables = new Map<string, string[][]>();
	ranges.forEach((range) => {
		if (range.table) {
			const rows = lines.slice(range.start + 1, range.end);
			tables.set(
				range.table,
				rows.map((row) => row.split("\t")),
			);
		}
	});

	const albums = tables.get("Album")?.map((entry) => {
		const [
			id,
			artistId,
			createdAt,
			sid,
			title,
			_userId,
			year,
			release,
			covers,
		] = entry;
		return {
			artistId,
			covers: parseNull(covers),
			createdAt: new Date(createdAt).getTime(),
			release: parseNull(release),
			_id: id,
			sid: parseNull(sid),
			title,
			year: parseNumberNull(year),
		};
	});

	console.log(tables.get("Artist"));

	const artists = tables.get("Artist")?.map((entry) => {
		const [id, createdAt, name, sid] = entry;
		return {
			createdAt: new Date(createdAt),
			_id: id,
			name,
			sid: sid === "\\N" ? null : (sid ?? null),
		};
	});

	// const reviews = tables.get("Review")?.map((entry) => {
	//   const [id, albumId, createdAt, rate, text] = entry;
	//   return {
	//     albumId: albumId!,
	//     createdAt: new Date(createdAt!),
	//     id: id!,
	//     rate: Number(rate!),
	//     text: text!,
	//     userId,
	//   };
	// });

	await fs.writeFile("scripts/albums.json", JSON.stringify(albums, null, 2));
	await fs.writeFile("scripts/artists.json", JSON.stringify(artists, null, 2));
};

const parseNull = (arg?: string) => {
	return arg === "\\N" ? null : (arg ?? null);
};

const parseNumberNull = (arg?: string) => {
	return arg === "\\N" ? null : (Number(arg) ?? null);
};

loadDumpData();
