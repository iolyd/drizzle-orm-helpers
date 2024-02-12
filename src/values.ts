import { SQL, sql } from 'drizzle-orm';

/**
 * Empty record as SQL json.
 */
export const emptyJsonObject = sql<object>`'{}'::json`;

/**
 * Empty array as SQL json.
 */
export const emptyJsonArray = sql<[never]>`'[]'::json`;

/**
 * Empty SQL array (not json typed)
 */
export const emptyArray = sql<SQL<[]>>`{}`;

/**
 * SQL template true value.
 */
export const tru = sql<true>`'true'`;

/**
 * SQL template false value.
 */
export const fal = sql<false>`'false'`;

/**
 * SQL template alias for true value.
 *
 * @see tru
 */
export const yes = tru;

/**
 * SQL template alias false value.
 *
 * @see fal
 */
export const no = fal;

/**
 * SQL template boolean value.
 */
export function bool<T extends boolean>(value: T) {
	return sql<T>`${value ? 'true' : 'false'}`;
}

/**
 * SQL template null value.
 */
export const nul = sql<null>`null`;

/**
 * SQL template infinity value.
 */
export const infinity = sql<typeof Infinity>`infinity`;

/**
 * SQL template today value.
 */
export const today = sql<Date>`today`;
