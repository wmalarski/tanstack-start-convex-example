import type { TokenStorage } from "@convex-dev/auth/react";
import { deleteCookie, getCookie, getEvent, setCookie } from "vinxi/http";
import { COOKIE_OPTIONS, DELETE_COOKIE_OPTIONS } from "./auth-storage";

export const serverStorage = (): TokenStorage => {
	return {
		getItem(key) {
			return getCookie(getEvent(), key);
		},
		removeItem(key) {
			deleteCookie(getEvent(), key, DELETE_COOKIE_OPTIONS);
		},
		setItem(key, value) {
			setCookie(getEvent(), key, value, COOKIE_OPTIONS);
		},
	};
};
