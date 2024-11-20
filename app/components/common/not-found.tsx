import { Link } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";
import { css } from "styled-system/css";
import { flex } from "styled-system/patterns";
import { link } from "styled-system/recipes";
import { Button } from "../ui/button";

export const NotFound = ({ children }: PropsWithChildren) => {
	return (
		<div className={css({ spaceY: 2, p: 2 })}>
			<div className={css({ color: "gray.10", _dark: { color: "gray.5" } })}>
				{children || <p>The page you are looking for does not exist.</p>}
			</div>
			<p className={flex({ flexWrap: "wrap", alignItems: "center", gap: 2 })}>
				<Button
					type="button"
					onClick={() => window.history.back()}
					className={link()}
				>
					Go back
				</Button>
				<Link to="/" className={link()}>
					Start Over
				</Link>
			</p>
		</div>
	);
};
