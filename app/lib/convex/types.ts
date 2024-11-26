export type OmitId<T> = {
	[t in keyof T]: T[t] extends { __tableName: string } ? string : T[t];
};
