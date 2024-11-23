/// <reference types="vinxi/types/server" />
import { getRouterManifest } from "@tanstack/start/router-manifest";
import {
	createStartHandler,
	defaultStreamHandler,
} from "@tanstack/start/server";

import { serverStorage } from "./lib/auth/server-storage";
import { createRouter } from "./router";

export default createStartHandler({
	createRouter: createRouter(serverStorage()),
	getRouterManifest,
})(defaultStreamHandler);
