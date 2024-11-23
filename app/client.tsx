/// <reference types="vinxi/types/client" />
import { StartClient } from "@tanstack/start";
import { hydrateRoot } from "react-dom/client";
import { clientStorage } from "./lib/auth/client-storage";
import { createRouter } from "./router";

const router = createRouter(clientStorage())();

hydrateRoot(document, <StartClient router={router} />);
