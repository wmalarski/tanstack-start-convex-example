import { createFileRoute } from "@tanstack/react-router";
import { css } from "styled-system/css";

export const Home = () => {
	return (
		<div className={css({ p: 2 })}>
			<h3>Welcome Home!!!</h3>
		</div>
	);
};

export const Route = createFileRoute("/")({
	component: Home,
});
