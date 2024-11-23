import { createServerFn } from "@tanstack/start";
import * as v from "valibot";
import { deleteCookie, getEvent, setCookie } from "vinxi/http";
import { valibotValidator } from "../common/valibot";

const COOKIE_KEY = "__convex_session";

const COOKIE_OPTIONS = {
	httpOnly: true,
	maxAge: 60 * 10, // 10 min
	path: "/",
	secure: import.meta.env.PROD,
};

export const setSessionCookie = createServerFn({ method: "POST" })
	.validator(valibotValidator(v.object({ token: v.string() })))
	.handler(async (ctx) => {
		const event = getEvent();

		setCookie(event, COOKIE_KEY, ctx.data.token, COOKIE_OPTIONS);

		return { success: true };
	});

export const clearSessionCookie = createServerFn({ method: "POST" }).handler(
	async () => {
		const event = getEvent();

		deleteCookie(event, COOKIE_KEY, COOKIE_OPTIONS);

		return { success: true };
	},
);
