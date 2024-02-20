// https://www.postgresql.org/docs/current/cube.html#CUBE-OPERATORS-TABLE

import type { SQLWrapper } from 'drizzle-orm';
import { bindIfParam, sql } from 'drizzle-orm';
import type { DistanceType } from './constants';
import { DISTANCE_TYPES, DISTANCE_TYPES_OPERATORS } from './constants';

/**
 * Do the cubes overlap?
 *
 * @example
 *
 * ```sql
 * cube && cube → boolean
 * ```
 */
export function overlaps(left: SQLWrapper, right: unknown) {
	return sql`${left} && ${bindIfParam(right, left)}`;
}

/**
 * Does the first cube contain the second?
 *
 * @example
 *
 * ```sql
 * cube @> cube → boolean
 * ```
 */
export function contains(left: SQLWrapper, right: unknown) {
	return sql`${left} @> ${bindIfParam(right, left)}`;
}

/**
 * Is the first cube contained in the second?
 *
 * @example
 *
 * ```sql
 * cube <@ cube → boolean
 * ```
 */
export function contained(left: SQLWrapper, right: unknown) {
	return sql`${left} <@ ${bindIfParam(right, left)}`;
}

/**
 * Extracts the n-th coordinate of the cube (counting from 1).
 *
 * @example
 *
 * ```sql
 * cube -> integer → float8
 * ```
 *
 * Extracts the n-th coordinate of the cube, counting in the following way: n = 2 * k - 1 means
 * lower bound of k-th dimension, n = 2 * k means upper bound of k-th dimension. Negative n denotes
 * the inverse value of the corresponding positive coordinate. This operator is designed for
 * KNN-GiST support.
 *
 * @example
 *
 * ```sql
 * cube ~> integer → float8
 * ```
 */
export function extract(left: SQLWrapper, right: unknown) {
	return sql`${left} -> ${bindIfParam(right, left)}`;
}

/**
 * Computes the distance between two cubes.
 *
 * @example
 *
 * ```sql
 * -- Computes the Euclidean distance between the two cubes.
 * cube <-> cube → float8
 * ```
 *
 * @example
 *
 * ```sql
 * -- Computes the taxicab (L-1 metric) distance between the two cubes.
 * cube <#> cube → float8
 * ```
 *
 * @example
 *
 * ```sql
 * -- Computes the Chebyshev (L-inf metric) distance between the two cubes.
 * cube <=> cube → float8
 * ```
 */
export function distance(
	left: SQLWrapper,
	right: unknown,
	{ type = DISTANCE_TYPES.EUCLIDIAN }: { type?: DistanceType } = {}
) {
	return sql`${left} ${DISTANCE_TYPES_OPERATORS[type]} ${bindIfParam(right, left)}`;
}
