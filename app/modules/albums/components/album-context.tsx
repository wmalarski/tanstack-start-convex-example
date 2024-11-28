import type { AlbumDoc, ArtistDoc } from "convex/utils";
import { createContext, useContext, type PropsWithChildren } from "react";

type AlbumContextValue = {
	album: AlbumDoc;
	artist: ArtistDoc;
};

const AlbumContext = createContext<AlbumContextValue | null>(null);

type AlbumContextProviderProps = PropsWithChildren<AlbumContextValue>;

export const AlbumContextProvider = ({
	album,
	artist,
	children,
}: AlbumContextProviderProps) => {
	return (
		<AlbumContext.Provider value={{ album, artist }}>
			{children}
		</AlbumContext.Provider>
	);
};

export const useAlbumContext = () => {
	const context = useContext(AlbumContext);

	if (!context) {
		throw new Error("AlbumContext is not defined");
	}

	return context;
};
