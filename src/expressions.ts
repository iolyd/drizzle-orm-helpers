import type { SQL, SQLWrapper } from 'drizzle-orm';
import { StringChunk, bindIfParam, sql } from 'drizzle-orm';
import type { TupleToUnion } from 'type-fest';
import { type InferData } from '.';
import type { NonUndefinable } from './internals';

/**
 * Distinct keyword.
 */
export function distinct<T extends SQLWrapper>(statement: T) {
	return sql<InferData<T>>`distinct ${statement}`;
}

/**
 * Case condition chain.
 *
 * @example
 *
 * ```ts
 * cases([[eq(thing, other), 2]], 3);
 * ```
 *
 * @example
 *
 * ```sql
 * CASE
 *  WHEN thing = other THEN 2
 *  ELSE 3
 * END;
 * ```
 *
 * @todo Implement smarter typing to identify confirmable early returns with truthy conditions.
 */
export function cases<
	const C extends ([SQLWrapper, unknown] | undefined)[],
	const F,
	T = NonUndefinable<TupleToUnion<C>>,
	R =
		| (T extends [infer T0, infer T1]
				? T0 extends SQL<false | null | 0 | 'f' | 'F' | '0'>
					? never
					: T1 extends SQLWrapper
						? InferData<T1>
						: T1
				: never)
		| (F extends void ? never : F extends SQLWrapper ? InferData<F> : F),
>(conditionals: C, fallback?: F) {
	const chunks = conditionals.reduce(
		(acc, curr) => {
			if (curr) {
				acc.push(sql`when ${curr[0]} then ${bindIfParam(curr[1], curr[0])}`);
			}
			return acc;
		},
		<SQL<unknown>[]>[]
	);
	if (fallback) {
		chunks.push(sql`else ${fallback}`);
	}
	return sql.join(
		[new StringChunk('(case'), ...chunks, new StringChunk(')')],
		new StringChunk(' ')
	) as SQL<R>;
}
