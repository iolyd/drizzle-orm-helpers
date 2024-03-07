import { SQL, StringChunk, sql, type SQLWrapper } from 'drizzle-orm';
import type { InferDataType } from '.';

/**
 * Add values.
 */
export function add<T extends SQLWrapper | number>(...values: T[]) {
	const additions = sql.join(values, new StringChunk(' + '));
	return new SQL([new StringChunk('('), additions, new StringChunk(')')]) as SQL<
		T extends SQLWrapper ? InferDataType<T> : T
	>;
}

/**
 * Subtract values.
 */
export function subtract<T extends SQLWrapper | number>(...values: T[]) {
	const subtractions = sql.join(values, new StringChunk(' - '));
	return new SQL([new StringChunk('('), subtractions, new StringChunk(')')]) as SQL<
		T extends SQLWrapper ? InferDataType<T> : T
	>;
}

/**
 * Subtract values.
 */
export function divide<T extends SQLWrapper | number>(...values: T[]) {
	const divisions = sql.join(values, new StringChunk(' / '));
	return new SQL([new StringChunk('('), divisions, new StringChunk(')')]) as SQL<
		T extends SQLWrapper ? InferDataType<T> : T
	>;
}

/**
 * Subtract values.
 */
export function multiply<T extends SQLWrapper | number>(...values: T[]) {
	const multiplications = sql.join(values, new StringChunk(' * '));
	return new SQL([new StringChunk('('), multiplications, new StringChunk(')')]) as SQL<
		T extends SQLWrapper ? InferDataType<T> : T
	>;
}
