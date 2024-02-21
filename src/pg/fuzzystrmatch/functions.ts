import type { SQLWrapper } from 'drizzle-orm';
import { sql } from 'drizzle-orm';

/**
 * @see https://www.postgresql.org/docs/current/fuzzystrmatch.html#FUZZYSTRMATCH-SOUNDEX
 */
export function soundex(text: string | SQLWrapper) {
	return sql`soundex(${text})`.mapWith(String);
}

/**
 * @see https://www.postgresql.org/docs/current/fuzzystrmatch.html#FUZZYSTRMATCH-DAITCH-MOKOTOFF
 */
export function difference(...texts: [string | SQLWrapper, string | SQLWrapper]) {
	return sql`difference(${texts[0]}, ${texts[1]})`.mapWith(Number);
}

/**
 * @see https://www.postgresql.org/docs/current/fuzzystrmatch.html#FUZZYSTRMATCH-DAITCH-MOKOTOFF
 */
export function daitch_mokotoff(source: SQLWrapper | string) {
	return sql<string[]>`daitch_mokotoff(${source})`;
}
