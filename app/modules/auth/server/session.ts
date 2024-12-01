import { api } from "convex/_generated/api";
import type { ConvexHttpClient } from "convex/browser";
import { deleteCookie, getCookie, getEvent, setCookie } from "vinxi/http";

const JWT_TOKEN_COOKIE_NAME = "__convexAuthJWT";
const REFRESH_TOKEN_COOKIE_NAME = "__convexAuthRefresh";

const BASE_COOKIE_OPTIONS = { path: "/", secure: import.meta.env.PROD };
const TOKEN_COOKIE_OPTIONS = { ...BASE_COOKIE_OPTIONS, maxAge: 60 * 60 };
const REFRESH_COOKIE_OPTIONS = {
	...BASE_COOKIE_OPTIONS,
	maxAge: 60 * 60 * 24 * 7,
};

export const getSessionJwtToken = async (convexClient: ConvexHttpClient) => {
	const event = getEvent();

	const jwtToken = getCookie(event, JWT_TOKEN_COOKIE_NAME);
	if (jwtToken) {
		return jwtToken;
	}

	const refreshToken = getCookie(event, REFRESH_TOKEN_COOKIE_NAME);
	if (!refreshToken) {
		return null;
	}

	const response = await convexClient.action(api.auth.signIn, { refreshToken });
	if (response.tokens) {
		setSessionTokens(response.tokens);
	}

	return response.tokens?.token;
};

type SetSessionTokensArgs = {
	token: string;
	refreshToken: string;
};

export const setSessionTokens = (tokens: SetSessionTokensArgs) => {
	const event = getEvent();
	setCookie(event, JWT_TOKEN_COOKIE_NAME, tokens.token, TOKEN_COOKIE_OPTIONS);
	setCookie(
		event,
		REFRESH_TOKEN_COOKIE_NAME,
		tokens.refreshToken,
		REFRESH_COOKIE_OPTIONS,
	);
};

export const clearSessionTokens = () => {
	const event = getEvent();
	deleteCookie(event, JWT_TOKEN_COOKIE_NAME, BASE_COOKIE_OPTIONS);
	deleteCookie(event, REFRESH_TOKEN_COOKIE_NAME, BASE_COOKIE_OPTIONS);
};
