import { customType } from 'drizzle-orm/pg-core';

/**
 * Postgres cube column type with customizable amount of dimensions.
 *
 * @see https://www.postgresql.org/docs/current/cube.html
 */
export const cube = customType<
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
		return `cube`;
	},
	fromDriver(value) {
		return value;
	},
	toDriver(value) {
		return value;
	},
});
