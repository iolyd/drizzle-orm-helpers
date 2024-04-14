import { SQL, StringChunk, sql, type SQLWrapper } from 'drizzle-orm';
import type { InferData } from '.';

/**
 * Add values.
 */
export function add<T extends (SQLWrapper | number)[]>(...values: T) {
	const additions = sql.join(values, new StringChunk(' + '));
	return new SQL([new StringChunk('('), additions, new StringChunk(')')]) as SQL<
		T[number] extends SQLWrapper ? InferData<T[number]> : T[number]
	>;
}

/**
 * Subtract values.
 */
export function subtract<T extends (SQLWrapper | number)[]>(...values: T) {
	const subtractions = sql.join(values, new StringChunk(' - '));
	return new SQL([new StringChunk('('), subtractions, new StringChunk(')')]) as SQL<
		T[number] extends SQLWrapper ? InferData<T[number]> : T[number]
	>;
}

/**
 * Divide values.
 */
export function divide<T extends (SQLWrapper | number)[]>(...values: T) {
	const divisions = sql.join(values, new StringChunk(' / '));
	return new SQL([new StringChunk('('), divisions, new StringChunk(')')]) as SQL<
		T[number] extends SQLWrapper ? InferData<T[number]> : T[number]
	>;
}

/**
 * Multiply values.
 */
export function multiply<T extends (SQLWrapper | number)[]>(...values: T) {
	const multiplications = sql.join(values, new StringChunk(' * '));
	return new SQL([new StringChunk('('), multiplications, new StringChunk(')')]) as SQL<
		T[number] extends SQLWrapper ? InferData<T[number]> : T[number]
	>;
}
