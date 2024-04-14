import { sql } from 'drizzle-orm';

/**
 * Empty record as SQL json.
 */
export const $emptyJsonObject = sql<object>`'{}'::json`;

/**
 * Empty array as SQL json.
 */
export const $emptyJsonArray = sql<[never]>`'[]'::json`;

/**
 * Empty SQL array (not json typed)
 */
export const $emptyArray = sql<[]>`'{}'`;

/**
 * An array with a single null member. Typically returned when aggregation result is empty.
 */
export const $nullArray = sql<[null]>`'{null}'`;

/**
 * Postgres value returned for empty ranges.
 */
export const $empty = sql<"'empty'" | []>`'empty'`;
