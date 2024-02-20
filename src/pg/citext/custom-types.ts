import { customType } from 'drizzle-orm/pg-core';
import { getSchemaPrefix, type ThisWithSchema } from '../../internals';

/**
 * Ci-text postgres column type.
 *
 * @see https://www.postgresql.org/docs/current/citext.html
 */
export function citext<TName extends string>(this: ThisWithSchema, name: TName) {
	const schemaPrefix = getSchemaPrefix.call(this);
	return customType<{ data: string }>({
		dataType() {
			return `${schemaPrefix}citext`;
		},
	})(name);
}
