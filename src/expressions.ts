import { SQLWrapper, sql } from 'drizzle-orm';

/**
 * When statement.
 *
 * @example
 *
 * ```sql
 * WHEN condition;
 * THEN statement;
 * ```
 */
export function wn(condition: SQLWrapper, statement: unknown) {
	return sql`when ${condition} then ${statement}`;
}

/**
 * Else statement for fallback statement in condition tree.
 *
 * - @example.
 *
 * ```sql
 * ELSE statement;
 * ```
 */
export function el(statement: SQLWrapper) {
	return sql`else ${statement}`;
}

/**
 * Case condition chain.
 *
 * @example
 *
 * ```sql
 * CASE statements END;
 * ```
 */
export function cs(...statements: SQLWrapper[]) {
	return sql.join([sql`case`, ...statements, sql`end`], sql` `);
}
