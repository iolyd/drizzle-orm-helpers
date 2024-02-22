import { customType } from 'drizzle-orm/pg-core';

/**
 * Postgres cube column type with customizable amount of dimensions.
 *
 * @see https://www.postgresql.org/docs/current/cube.html
 */
export const cube = customType<{
	data: number[] | [number[], number[]];
	driverData: number[] | [number[], number[]];
}>({
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
