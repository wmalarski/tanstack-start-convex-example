import type { ErrorComponentProps } from "@tanstack/react-router";
import {
	ErrorComponent,
	Link,
	rootRouteId,
	useMatch,
	useRouter,
} from "@tanstack/react-router";
import { Button, buttonVariants } from "~/ui/button";

export const DefaultCatchBoundary = ({ error }: ErrorComponentProps) => {
	const router = useRouter();

	const isRoot = useMatch({
		strict: false,
		select: (state) => state.id === rootRouteId,
	});

	console.error("DefaultCatchBoundary Error:", error);

	return (
		<div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-6 p-4">
			<ErrorComponent error={error} />
			<div className="flex flex-wrap items-center gap-2">
				<Button
					type="button"
					onClick={() => router.invalidate()}
					variant="link"
				>
					Try Again
				</Button>
				{isRoot ? (
					<Link to="/" className={buttonVariants()}>
						Home
					</Link>
				) : (
					<Link
						to="/"
						className={buttonVariants()}
						onClick={(event) => {
							event.preventDefault();
							window.history.back();
						}}
					>
						Go Back
					</Link>
				)}
			</div>
		</div>
	);
};
