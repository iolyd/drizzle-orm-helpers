import { sql } from 'drizzle-orm';

/**
 * MySQL random function.
 *
 * @example
 *
 * ```sql
 * rand();
 * ```
 *
 * @returns Random number between 0 and 1.
 */
export function random() {
	return sql<number>`rand()`;
}
