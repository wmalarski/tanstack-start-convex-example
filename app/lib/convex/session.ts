import { getCookie, getEvent } from "vinxi/http";

const CONVEX_COOKIE_NAME = "__convexAuthJWT";

export const getSessionToken = () => {
	return getCookie(getEvent(), CONVEX_COOKIE_NAME);
};
