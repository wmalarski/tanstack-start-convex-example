import * as v from "valibot";

export const valibotValidator =
	<TSchema extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>>(
		schema: TSchema,
	) =>
	(args: unknown) => {
		return v.parse(schema, args);
	};
