import type { SQLWrapper } from 'drizzle-orm';
import { bindIfParam, sql } from 'drizzle-orm';

/**
 * Test a text search query against a ts_vector value.
 */
export function ts(vector: SQLWrapper, querytext: SQLWrapper) {
	return sql`${vector} @@ ${bindIfParam(querytext, vector)}`;
}
