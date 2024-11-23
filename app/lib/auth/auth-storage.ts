const BASE_COOKIE_OPTIONS = { path: "/", secure: import.meta.env.PROD };

export const DELETE_COOKIE_OPTIONS = { ...BASE_COOKIE_OPTIONS, maxAge: -1 };

export const COOKIE_OPTIONS = {
	...BASE_COOKIE_OPTIONS,
	maxAge: 60 * 10, // 10 min
};
