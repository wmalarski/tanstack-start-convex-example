import type { ErrorComponentProps } from "@tanstack/react-router";
import {
	ErrorComponent,
	Link,
	rootRouteId,
	useMatch,
	useRouter,
} from "@tanstack/react-router";
import { Flex } from "styled-system/jsx";
import { button } from "styled-system/recipes";
import { Button } from "../ui/button";

export const DefaultCatchBoundary = ({ error }: ErrorComponentProps) => {
	const router = useRouter();

	const isRoot = useMatch({
		strict: false,
		select: (state) => state.id === rootRouteId,
	});

	console.error("DefaultCatchBoundary Error:", error);

	return (
		<Flex
			p={4}
			gap={6}
			minWidth={0}
			flexDirection="column"
			flex="1 1 0%"
			justifyContent="center"
			alignItems="center"
		>
			<ErrorComponent error={error} />
			<Flex flexWrap="wrap" alignItems="center" gap={2}>
				<Button
					type="button"
					onClick={() => router.invalidate()}
					variant="link"
				>
					Try Again
				</Button>
				{isRoot ? (
					<Link to="/" className={button()}>
						Home
					</Link>
				) : (
					<Link
						to="/"
						className={button()}
						onClick={(event) => {
							event.preventDefault();
							window.history.back();
						}}
					>
						Go Back
					</Link>
				)}
			</Flex>
		</Flex>
	);
};
