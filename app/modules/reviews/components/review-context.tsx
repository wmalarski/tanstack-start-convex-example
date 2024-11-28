import type { ReviewDoc } from "convex/utils";
import { type PropsWithChildren, createContext, useContext } from "react";

type ReviewContextValue = {
	review: ReviewDoc;
};

const ReviewContext = createContext<ReviewContextValue | null>(null);

type ReviewContextProviderProps = PropsWithChildren<ReviewContextValue>;

export const ReviewContextProvider = ({
	review,
	children,
}: ReviewContextProviderProps) => {
	return (
		<ReviewContext.Provider value={{ review }}>
			{children}
		</ReviewContext.Provider>
	);
};

export const useReviewContext = () => {
	const context = useContext(ReviewContext);

	if (!context) {
		throw new Error("ReviewContext is not defined");
	}

	return context;
};
