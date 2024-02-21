import { customType } from 'drizzle-orm/pg-core';

/**
 * Ci-text postgres column type.
 *
 * @see https://www.postgresql.org/docs/current/citext.html
 */
export const citext = customType<{ data: string }>({
	dataType() {
		return `citext`;
	},
});
