import { SQLWrapper, bindIfParam, sql } from 'drizzle-orm';

/**
 * Test a text search query against a ts_vector value.
 */
export function ts(vector: SQLWrapper, querytext: SQLWrapper) {
	return sql`${vector} @@ ${bindIfParam(querytext, vector)}`;
}
