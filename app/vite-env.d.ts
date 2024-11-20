interface ImportMetaEnv {
	readonly VITE_CONVEX_URL: string;
	readonly VITE_PUBLIC_CONVEX_URL: string;
	readonly CONVEX_DEPLOYMENT: string;
}

// biome-ignore lint/correctness/noUnusedVariables: This is global override
interface ImportMeta {
	readonly env: ImportMetaEnv;
}
