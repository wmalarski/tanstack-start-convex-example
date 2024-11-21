import { Link } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";
import { Button } from "../ui/button";

export const NotFound = ({ children }: PropsWithChildren) => {
	return (
		<div className="space-y-2 p-2">
			<div className="text-gray-600 dark:text-gray-400">
				{children || <p>The page you are looking for does not exist.</p>}
			</div>
			<p className="flex flex-wrap items-center gap-2">
				<Button type="button" onClick={() => window.history.back()}>
					Go back
				</Button>
				<Link to="/">Start Over</Link>
			</p>
		</div>
	);
};
