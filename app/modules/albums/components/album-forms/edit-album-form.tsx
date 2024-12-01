import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { decode } from "decode-formdata";
import type { ComponentProps } from "react";
import { Button } from "~/ui/button";
import { getAlbumQueryOptions, patchAlbumMutation } from "../../server/albums";
import { AlbumFields } from "./album-fields";

type EditAlbumFormProps = {
	albumId: string;
};

export const EditAlbumForm = ({ albumId }: EditAlbumFormProps) => {
	const navigate = useNavigate();

	const albumQuery = useSuspenseQuery(getAlbumQueryOptions({ albumId }));

	const mutation = useMutation({
		mutationFn: (formData: FormData) => {
			return patchAlbumMutation({ data: decode(formData) });
		},
		onSuccess: async () => {
			await navigate({
				to: "/albums/$albumId",
				params: { albumId: albumQuery.data.album._id },
			});
		},
	});

	const onSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
		event.preventDefault();
		mutation.mutate(new FormData(event.currentTarget));
	};

	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-2">
			<input
				type="hidden"
				defaultValue={albumQuery.data.album._id}
				name="albumId"
			/>

			<AlbumFields initial={albumQuery.data.album} />

			<Button hasLoader={mutation.isPending} type="submit">
				Save album
			</Button>
		</form>
	);
};
