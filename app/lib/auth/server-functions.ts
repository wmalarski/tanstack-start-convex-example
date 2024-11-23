import { createServerFn } from "@tanstack/start";
import { parse } from "cookie-es";
import { getEvent, getHeader } from "vinxi/http";

export const getSessionCookie = createServerFn({ method: "GET" }).handler(
	async () => {
		const event = getEvent();
		const header = getHeader(event, "Cookie");
		const cookies = header ? parse(header) : {};

		const token = Object.entries(cookies).find(([key]) =>
			key.startsWith("__convexAuthJWT"),
		)?.[1];

		return token ?? null;
	},
);
