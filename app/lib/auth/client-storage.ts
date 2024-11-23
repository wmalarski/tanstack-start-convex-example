import type { TokenStorage } from "@convex-dev/auth/react";
import { parse, serialize } from "cookie-es";
import { COOKIE_OPTIONS, DELETE_COOKIE_OPTIONS } from "./auth-storage";

export const clientStorage = (): TokenStorage => {
	return {
		getItem(key) {
			const parsed = parse(document.cookie);
			return parsed[key];
		},
		removeItem(key) {
			const serialized = serialize(key, "", DELETE_COOKIE_OPTIONS);
			document.cookie = serialized;
		},
		setItem(key, value) {
			const serialized = serialize(key, value, COOKIE_OPTIONS);
			document.cookie = serialized;
		},
	};
};
