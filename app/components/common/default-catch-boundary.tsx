import type { ErrorComponentProps } from "@tanstack/react-router";
import {
	ErrorComponent,
	Link,
	rootRouteId,
	useMatch,
	useRouter,
} from "@tanstack/react-router";
import { Flex } from "styled-system/jsx";

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
				<button
					type="button"
					onClick={() => router.invalidate()}
					className="rounded bg-gray-600 px-2 py-1 font-extrabold text-white uppercase dark:bg-gray-700"
				>
					Try Again
				</button>
				{isRoot ? (
					<Link
						to="/"
						className="rounded bg-gray-600 px-2 py-1 font-extrabold text-white uppercase dark:bg-gray-700"
					>
						Home
					</Link>
				) : (
					<Link
						to="/"
						className="rounded bg-gray-600 px-2 py-1 font-extrabold text-white uppercase dark:bg-gray-700"
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
