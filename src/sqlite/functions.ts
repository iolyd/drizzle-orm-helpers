import { sql } from 'drizzle-orm';

/**
 * SQLite random function.
 *
 * @example
 *
 * ```sql
 * random();
 * ```
 *
 * @returns Random random integer between -9223372036854775808 and +9223372036854775807.
 */
export function random() {
	return sql<number>`random()`;
}
