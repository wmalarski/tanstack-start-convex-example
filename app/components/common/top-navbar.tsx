import { useAuthActions } from "@convex-dev/auth/react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button, buttonVariants } from "../ui/button";

export const TopNavbar = () => {
	const navigate = useNavigate();

	const { signOut } = useAuthActions();

	const onSignOutClick = async () => {
		await signOut();
		await navigate({ to: "/auth/sign-in" });
	};

	return (
		<nav>
			<ul className="flex gap-2 p-1">
				<li>
					<Link to="/" className={buttonVariants({ variant: "ghost" })}>
						Home
					</Link>
				</li>
				<li>
					<Link to="/albums" className={buttonVariants({ variant: "ghost" })}>
						Albums
					</Link>
				</li>
				<li>
					<Link
						to="/albums/search"
						className={buttonVariants({ variant: "ghost" })}
					>
						Search
					</Link>
				</li>
				<li>
					<Link
						to="/albums/reviews"
						className={buttonVariants({ variant: "ghost" })}
					>
						Reviews
					</Link>
				</li>
				<li>
					<Button onClick={onSignOutClick}>Sign Out</Button>
				</li>
			</ul>
		</nav>
	);
};
