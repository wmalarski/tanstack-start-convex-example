import { useAuthToken } from "@convex-dev/auth/react";
import type { Doc } from "convex/_generated/dataModel";
import { useConvex, useConvexAuth } from "convex/react";
import { createContext, type PropsWithChildren } from "react";

type UserContextValue = {
	user: Doc<"users">;
};

const UserContext = createContext<UserContextValue | null>(null);

// type UserContextProviderProps = {

// }

export const UserContextProvider = ({ children }: PropsWithChildren) => {
	useConvexAuth();
	useAuthToken();
	useConvex();

	return <UserContext.Provider value={null}>{children}</UserContext.Provider>;
};
