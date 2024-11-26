import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/ui/form";
import { Input } from "~/ui/input";

type ReviewFieldsData = {
	rate: number;
	text: string;
};

type ReviewFieldsProps = {
	initial?: ReviewFieldsData;
};

export const ReviewFields = ({ initial }: ReviewFieldsProps) => {
	return (
		<div className="flex flex-col gap-2">
			<FormItem>
				<FormLabel>Review</FormLabel>
				<FormControl>
					<Input
						required
						name="text"
						type="text"
						placeholder="Review"
						defaultValue={initial?.text}
					/>
				</FormControl>
				<FormDescription>Enter you review</FormDescription>
				<FormMessage />
			</FormItem>

			<FormItem>
				<FormLabel>Rate</FormLabel>
				<FormControl>
					<Input
						required
						max={10}
						min={0}
						step={0.1}
						defaultValue={initial?.rate ?? 5}
						name="rate"
						type="number"
						placeholder="Rate"
					/>
				</FormControl>
				<FormDescription>Enter you score</FormDescription>
				<FormMessage />
			</FormItem>
		</div>
	);
};
