import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "~/ui/button";
import { signOutMutation } from "../server/server-functions";

export const SignOutButton = () => {
	const navigate = useNavigate();

	const mutation = useMutation({
		mutationFn: () => {
			return signOutMutation();
		},
		onSuccess: async () => {
			await navigate({ to: "/auth/sign-in" });
		},
	});

	const onSignOutClick = async () => {
		mutation.mutate();
	};

	return <Button onClick={onSignOutClick}>Sign Out</Button>;
};
