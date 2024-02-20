import type { SQLWrapper } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import { getSchemaPrefix, type ThisWithSchema } from '../../internals';

/**
 * @see https://www.postgresql.org/docs/current/fuzzystrmatch.html#FUZZYSTRMATCH-SOUNDEX
 */
export function soundex(this: ThisWithSchema, text: string | SQLWrapper) {
	return sql`${getSchemaPrefix.call(this)}soundex(${text})`.mapWith(String);
}

/**
 * @see https://www.postgresql.org/docs/current/fuzzystrmatch.html#FUZZYSTRMATCH-DAITCH-MOKOTOFF
 */
export function difference(
	this: ThisWithSchema,
	...texts: [string | SQLWrapper, string | SQLWrapper]
) {
	return sql`${getSchemaPrefix.call(this)}difference(${texts[0]}, ${texts[1]})`.mapWith(Number);
}

/**
 * @see https://www.postgresql.org/docs/current/fuzzystrmatch.html#FUZZYSTRMATCH-DAITCH-MOKOTOFF
 */
export function daitch_mokotoff(this: ThisWithSchema, source: SQLWrapper | string) {
	return sql<string[]>`${getSchemaPrefix.call(this)}daitch_mokotoff(${source})`;
}
