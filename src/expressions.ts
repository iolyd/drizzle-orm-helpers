import type { SQLWrapper } from 'drizzle-orm';
import { SQL, StringChunk, isSQLWrapper, sql } from 'drizzle-orm';
import type { InferDataType } from '.';

/**
 * Distinct keyword.
 */
export function distinct<T extends SQLWrapper>(statement: T) {
	return sql<InferDataType<T>>`distinct ${statement}`;
}

/**
 * Case condition chain.
 *
 * @example
 *
 * ```ts
 * cs([eq(...), 2], 3)
 * ```
 *
 * @example
 *
 * ```sql
 * CASE statements END;
 * ```
 */
export function cases(
	...cases:
		| [...([SQLWrapper, unknown] | undefined)[], unknown][]
		| ([SQLWrapper, unknown] | undefined)[]
): SQL | undefined;
export function cases(
	...unfilteredCases:
		| [...([SQLWrapper, unknown] | undefined)[], unknown][]
		| ([SQLWrapper, unknown] | undefined)[]
): SQL | undefined {
	const cases = unfilteredCases.filter((c): c is Exclude<typeof c, undefined> => c !== undefined);
	if (cases.length === 0) {
		return undefined;
	}
	const fallback =
		!Array.isArray(cases[cases.length - 1]) || !isSQLWrapper(cases[cases.length - 1])
			? cases.pop()
			: undefined;
	const chunks = cases.map(
		(c) =>
			new SQL([new StringChunk('when '), sql`${c[0]}`, new StringChunk(' then '), sql`${c[1]}`])
	);
	if (fallback) {
		chunks.push(new SQL([new StringChunk('else '), sql`${fallback}`]));
	}
	return sql.join(
		[new StringChunk('(case'), ...chunks, new StringChunk('end)')],
		new StringChunk(' ')
	);
}
