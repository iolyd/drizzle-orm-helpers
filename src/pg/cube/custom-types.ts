import { customType } from 'drizzle-orm/pg-core';
import type { ThisWithSchema } from '../../internals';
import { getSchemaPrefix } from '../../internals';

/**
 * Postgres cube column type with customizable amount of dimensions.
 *
 * @see https://www.postgresql.org/docs/current/cube.html
 */
export function cube<TName extends string>(this: ThisWithSchema, name: TName) {
	const schemaPrefix = getSchemaPrefix.call(this);
	return customType<
		| {
				data: number[];
				driverData: number[];
		  }
		| {
				data: number[][];
				driverData: number[][];
		  }
	>({
		dataType() {
			return `${schemaPrefix}cube`;
		},
		fromDriver(value) {
			return value;
		},
		toDriver(value) {
			return value;
		},
	})(name);
}
