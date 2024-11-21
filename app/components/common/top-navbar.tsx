import { useAuthActions } from "@convex-dev/auth/react";
import { Link } from "@tanstack/react-router";
import { button } from "styled-system/recipes";
import { Button } from "../ui/button";

export const TopNavbar = () => {
	const { signOut } = useAuthActions();

	const onSignOutClick = async () => {
		await signOut();
	};

	return (
		<nav>
			<ul>
				<li>
					<Link to="/" className={button()}>
						Albums
					</Link>
				</li>
				<li>
					<Button onClick={onSignOutClick}>Sign Out</Button>
				</li>
			</ul>
		</nav>
	);
};
