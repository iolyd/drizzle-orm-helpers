import type { SQL } from 'drizzle-orm';
import { sql } from 'drizzle-orm';

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
 * Postgres value returned for empty ranges.
 */
export const empty = sql`empty`.mapWith(String);

/**
 * SQL template infinity value.
 */
export const infinity = sql<typeof Infinity>`infinity`;

/**
 * SQL template today value.
 */
export const today = sql<Date>`today`;

/**
 * Get the current time as a constant.
 *
 * @example
 *
 * ```sql
 * 'now';
 * ```
 */
export const now = sql<Date>`'now'`;
