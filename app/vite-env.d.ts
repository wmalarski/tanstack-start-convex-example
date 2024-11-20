interface ImportMetaEnv {
	readonly VITE_CONVEX_URL: string;
	readonly VITE_PUBLIC_CONVEX_URL: string;
	readonly CONVEX_DEPLOYMENT: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
