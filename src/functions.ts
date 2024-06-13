import type { SQL, SQLWrapper } from 'drizzle-orm';
import { StringChunk, sql } from 'drizzle-orm';
import type { InferData } from '.';

type RemoveNull<T> = T extends null ? never : T;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CoalesceSQL<T extends unknown[], N extends boolean = true, R = never> = T extends [
	infer H,
	...infer T,
]
	? CoalesceSQL<
			T,
			H extends SQL | SQL.Aliased ? (null extends InferData<H> ? true : false) : never,
			R | RemoveNull<H extends SQL | SQL.Aliased ? InferData<H> : never>
		>
	: N extends true
		? R | null
		: R;
/**
 * @see https://www.postgresql.org/docs/current/functions-conditional.html#FUNCTIONS-COALESCE-NVL-IFNULL
 */
export function coalesce<T extends unknown[]>(...values: [...T]) {
	return sql<CoalesceSQL<T>>`coalesce(${sql.join(
		values.map((v) => sql`${v}`),
		sql`,`
	)})`;
}

/**
 * Return null if value meets condition. Useful to coalesce to something else.
 *
 * @see https://www.postgresql.org/docs/current/functions-conditional.html#FUNCTIONS-NULLIF
 */
export function nullIf<V extends SQLWrapper, C>(value: V, condition: C) {
	return sql<V | null>`nullif(${value}, ${condition})`;
}

/**
 * @see https://www.postgresql.org/docs/current/functions-conditional.html#FUNCTIONS-GREATEST-LEAST
 */
export function greatest<T extends unknown[]>(...values: [...T]) {
	return sql.join([
		new StringChunk('greatest('),
		sql.join(
			values.map((v) => sql`${v}`),
			new StringChunk(', ')
		),
		new StringChunk(')'),
	]) as SQL<{ [I in keyof T]: T[I] extends SQLWrapper ? InferData<T[I]> : T[I] }[number]>;
}

/**
 * @see https://www.postgresql.org/docs/current/functions-conditional.html#FUNCTIONS-GREATEST-LEAST
 */
export function least<T extends unknown[]>(...values: [...T]) {
	return sql.join([
		new StringChunk('least('),
		sql.join(
			values.map((v) => sql`${v}`),
			new StringChunk(', ')
		),
		new StringChunk(')'),
	]) as SQL<{ [I in keyof T]: T[I] extends SQLWrapper ? InferData<T[I]> : T[I] }[number]>;
}
