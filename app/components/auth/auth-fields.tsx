import { HStack } from "styled-system/jsx";
import { Field } from "../ui/field";

export const AuthFields = () => {
	return (
		<HStack gap={2}>
			<Field.Root>
				<Field.Label>Email</Field.Label>
				<Field.Input name="email" type="text" placeholder="Email" />
				<Field.HelperText>Enter you email</Field.HelperText>
			</Field.Root>
			<Field.Root>
				<Field.Label>Password</Field.Label>
				<Field.Input name="password" type="password" placeholder="Password" />
				<Field.HelperText>Enter you password</Field.HelperText>
			</Field.Root>
		</HStack>
	);
};
