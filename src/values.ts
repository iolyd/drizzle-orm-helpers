import { sql } from 'drizzle-orm';

/**
 * SQL template true value.
 */
export const $true = sql<true>`'true'`;

/**
 * SQL template false value.
 */
export const $false = sql<false>`'false'`;

/**
 * SQL template boolean value.
 */
export function $boolean<T extends boolean>(value: T) {
	return sql<T>`${value ? 'true' : 'false'}`;
}

/**
 * SQL template null value.
 */
export const $null = sql<null>`null`;

/**
 * @example
 *
 * ```sql
 * current_timestamp();
 * ```
 */
export const $currentTimestamp = sql<Date>`current_timestamp`;
