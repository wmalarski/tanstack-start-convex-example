import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/ui/form";
import { Input } from "~/ui/input";

type AlbumFieldsData = {
	year?: number;
	title: string;
};

type AlbumFieldsProps = {
	initial?: AlbumFieldsData;
};

export const AlbumFields = ({ initial }: AlbumFieldsProps) => {
	return (
		<div className="flex flex-col gap-2">
			<FormItem>
				<FormLabel>Title</FormLabel>
				<FormControl>
					<Input
						required
						name="title"
						type="text"
						placeholder="Title"
						defaultValue={initial?.title}
					/>
				</FormControl>
				<FormDescription>Enter album title</FormDescription>
				<FormMessage />
			</FormItem>

			<FormItem>
				<FormLabel>Year</FormLabel>
				<FormControl>
					<Input
						required
						max={2100}
						min={1900}
						defaultValue={initial?.year ?? 2000}
						name="year"
						type="number"
						placeholder="Year"
					/>
				</FormControl>
				<FormDescription>Enter album release year</FormDescription>
				<FormMessage />
			</FormItem>
		</div>
	);
};
