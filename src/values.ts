import { sql } from 'drizzle-orm';

/**
 * SQL template true value.
 */
export const tru = sql<true>`'true'`;

/**
 * SQL template false value.
 */
export const fal = sql<false>`'false'`;

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
 * @example
 *
 * ```sql
 * current_timestamp();
 * ```
 */
export const currentTimestamp = sql<Date>`current_timestamp`;
