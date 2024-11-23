import type { TokenStorage } from "@convex-dev/auth/react";

export const serverStorage = (): TokenStorage => {
	return {
		getItem(key) {
			//
		},
		removeItem(key) {
			//
		},
		setItem(key, value) {},
	};
};
