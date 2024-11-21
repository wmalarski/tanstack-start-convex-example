import { useAuthActions } from "@convex-dev/auth/react";
import { Link } from "@tanstack/react-router";
import { Button, buttonVariants } from "../ui/button";

export const TopNavbar = () => {
	const { signOut } = useAuthActions();

	const onSignOutClick = async () => {
		await signOut();
	};

	return (
		<nav>
			<ul>
				<li>
					<Link to="/" className={buttonVariants()}>
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
