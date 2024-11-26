import { deleteCookie, getCookie, getEvent, setCookie } from "vinxi/http";

const JWT_TOKEN_COOKIE_NAME = "__convexAuthJWT";
const REFRESH_TOKEN_COOKIE_NAME = "__convexAuthRefresh";

const BASE_COOKIE_OPTIONS = { path: "/", secure: import.meta.env.PROD };
const COOKIE_OPTIONS = { ...BASE_COOKIE_OPTIONS, maxAge: 60 * 10 };

export const getSessionJwtToken = () => {
	return getCookie(getEvent(), JWT_TOKEN_COOKIE_NAME);
};

type SetSessionTokensArgs = {
	token: string;
	refreshToken: string;
};

export const setSessionTokens = (tokens: SetSessionTokensArgs) => {
	const event = getEvent();
	setCookie(event, JWT_TOKEN_COOKIE_NAME, tokens.token, COOKIE_OPTIONS);
	setCookie(
		event,
		REFRESH_TOKEN_COOKIE_NAME,
		tokens.refreshToken,
		COOKIE_OPTIONS,
	);
};

export const clearSessionTokens = () => {
	const event = getEvent();
	deleteCookie(event, JWT_TOKEN_COOKIE_NAME, BASE_COOKIE_OPTIONS);
	deleteCookie(event, REFRESH_TOKEN_COOKIE_NAME, BASE_COOKIE_OPTIONS);
};
