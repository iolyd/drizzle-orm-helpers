import type { SQL } from 'drizzle-orm';
import { sql } from 'drizzle-orm';

/**
 * Empty record as SQL json.
 */
export const $jsonObject = sql<object>`'{}'::json`;

/**
 * Empty array as SQL json.
 */
export const $jsonArray = sql<[never]>`'[]'::json`;

/**
 * Empty SQL array (not json typed)
 */
export const $array = sql<SQL<[]>>`{}`;

/**
 * Postgres value returned for empty ranges.
 */
export const $empty = sql`'empty'`.mapWith(String);
