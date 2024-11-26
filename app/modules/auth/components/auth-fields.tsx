import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/ui/form";
import { Input } from "~/ui/input";

export const AuthFields = () => {
	return (
		<div className="flex flex-col gap-2">
			<FormItem>
				<FormLabel>Email</FormLabel>
				<FormControl>
					<Input required name="email" type="text" placeholder="Email" />
				</FormControl>
				<FormDescription>Enter you email</FormDescription>
				<FormMessage />
			</FormItem>

			<FormItem>
				<FormLabel>Password</FormLabel>
				<FormControl>
					<Input
						required
						name="password"
						type="password"
						placeholder="Password"
					/>
				</FormControl>
				<FormDescription>Enter you password</FormDescription>
				<FormMessage />
			</FormItem>
		</div>
	);
};
