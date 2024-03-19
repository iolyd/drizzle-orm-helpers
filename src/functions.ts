import type { SQL } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import type { InferData } from '.';

/**
 * SQL coalesce.
 */
export function coalesce<T extends SQL[]>(...values: T) {
	return sql.join([
		sql.raw('coalesce('),
		sql.join(
			values.map((v) => sql`${v}`),
			sql.raw(', ')
		),
		sql.raw(')'),
	]) as CoalesceSQL<T>;
}
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
		? SQL<R | null>
		: SQL<R>;
