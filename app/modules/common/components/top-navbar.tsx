import { Link } from "@tanstack/react-router";
import { SignOutButton } from "~/modules/auth/components/sign-out-button";
import { buttonVariants } from "~/ui/button";

export const TopNavbar = () => {
	return (
		<nav className="mx-auto flex w-full max-w-4xl justify-between gap-2 p-2">
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
			</ul>
			<SignOutButton />
		</nav>
	);
};
