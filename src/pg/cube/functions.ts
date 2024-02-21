// https://www.postgresql.org/docs/current/cube.html#CUBE-FUNCTIONS-TABLE

import type { SQLWrapper } from 'drizzle-orm';
import { StringChunk, sql } from 'drizzle-orm';

/**
 * Makes a one dimensional cube with both coordinates the same.
 *
 * @example
 *
 * ```sql
 * -- cube ( float8 ) → cube
 * cube(1) → (1)
 * ```
 *
 * Makes a one dimensional cube.
 *
 * @example
 *
 * ```sql
 * -- cube ( float8, float8 ) → cube
 * cube(1, 2) → (1),(2)
 * ```
 *
 * Makes a zero-volume cube using the coordinates defined by the array.
 *
 * @example
 *
 * ```sql
 * -- cube ( float8[] ) → cube
 * cube(ARRAY[1,2,3]) → (1, 2, 3)
 * ```
 *
 * Makes a cube with upper right and lower left coordinates as defined by the two arrays, which must
 * be of the same length.
 *
 * @example
 *
 * ```sql
 * -- cube ( float8[], float8[] ) → cube
 * cube(ARRAY[1,2], ARRAY[3,4]) → (1, 2),(3, 4)
 * ```
 *
 * Makes a new cube by adding a dimension on to an existing cube, with the same values for both
 * endpoints of the new coordinate. This is useful for building cubes piece by piece from calculated
 * values.
 *
 * @example
 *
 * ```sql
 * -- cube ( cube, float8 ) → cube
 * cube('(1,2),(3,4)'::cube, 5) → (1, 2, 5),(3, 4, 5)
 * ```
 *
 * Makes a new cube by adding a dimension on to an existing cube. This is useful for building cubes
 * piece by piece from calculated values.
 *
 * @example
 *
 * ```sql
 * --cube ( cube, float8, float8 ) → cube
 * cube('(1,2),(3,4)'::cube, 5, 6) → (1, 2, 5),(3, 4, 6)
 * ```
 */
export function makeCube<
	T extends
		| [number]
		| [number, number]
		| number[]
		| [number[], number[]]
		| [SQLWrapper, number]
		| [SQLWrapper, number, number],
>(...args: T) {
	const params = sql.join(
		args.map((c) => sql`${c}`),
		new StringChunk(',')
	);
	return sql<number[]>`cube(${params})`;
}

/**
 * Returns the number of dimensions of the cube.
 *
 * @example
 *
 * ```sql
 * --cube_dim ( cube ) → integer
 * cube_dim('(1,2),(3,4)') → 2
 * ```
 */
export function cubeDim(cube: SQLWrapper) {
	return sql`cube_dim(${cube})`.mapWith(Number);
}

/**
 * Returns the n-th coordinate value for the lower left corner of the cube.
 *
 * @example
 *
 * ```sql
 * -- cube_ll_coord ( cube, integer ) → float8
 * cube_ll_coord('(1,2),(3,4)', 2) → 2
 * ```
 */
export function cubeLowerLeftCoord() {}

/**
 * ```
 * Returns the n-th coordinate value for the upper right corner of the cube.
 * ```
 *
 * @example
 *
 * ```sql
 * -- cube_ur_coord ( cube, integer ) → float8
 * cube_ur_coord('(1,2),(3,4)', 2) → 4
 * ```
 */
export function cubeUpperRightCoord() {}

/**
 * Returns true if the cube is a point, that is, the two defining corners are the same.
 *
 * @example
 *
 * ```sql
 * -- cube_is_point ( cube ) → boolean
 * cube_is_point(cube(1,1)) → t
 * ```
 */
export function cubeIsPoint(cube: SQLWrapper) {
	return sql`cube_is_point(${cube})`.mapWith(Boolean);
}

/**
 * Returns the distance between two cubes. If both cubes are points, this is the normal distance
 * function.
 *
 * @example
 *
 * ```sql
 * -- cube_distance ( cube, cube ) → float8
 * cube_distance('(1,2)', '(3,4)') → 2.8284271247461903
 * ```
 */
export function cubeDistance(...cubes: [SQLWrapper, SQLWrapper]) {
	const params = sql.join(cubes, new StringChunk(','));
	return sql`cube_distance(${params})`.mapWith(Number);
}

/**
 * Makes a new cube from an existing cube, using a list of dimension indexes from an array. Can be
 * used to extract the endpoints of a single dimension, or to drop dimensions, or to reorder them as
 * desired.
 *
 * @example
 *
 * ```sql
 * cube_subset ( cube, integer[] ) → cube
 * cube_subset(cube('(1,3,5),(6,7,8)'), ARRAY[2]) → (3),(7)
 * cube_subset(cube('(1,3,5),(6,7,8)'), ARRAY[3,2,1,1]) → (5, 3, 1, 1),(8, 7, 6, 6)
 * ```
 */
export function cubeSubset() {}

/**
 * Produces the union of two cubes.
 *
 * @example
 *
 * ```sql
 * -- cube_union ( cube, cube ) → cube
 * cube_union('(1,2)', '(3,4)') → (1, 2),(3, 4)
 * ```
 */
export function cubeUnion() {}

/**
 * Produces the intersection of two cubes.
 *
 * @example
 *
 * ```sql
 * -- cube_inter ( cube, cube ) → cube
 * cube_inter('(1,2)', '(3,4)') → (3, 4),(1, 2)
 * ```
 */
export function cubeInter() {}

/**
 * Increases the size of the cube by the specified radius r in at least n dimensions. If the radius
 * is negative the cube is shrunk instead. All defined dimensions are changed by the radius r.
 * Lower-left coordinates are decreased by r and upper-right coordinates are increased by r. If a
 * lower-left coordinate is increased to more than the corresponding upper-right coordinate (this
 * can only happen when r < 0) than both coordinates are set to their average. If n is greater than
 * the number of defined dimensions and the cube is being enlarged (r > 0), then extra dimensions
 * are added to make n altogether; 0 is used as the initial value for the extra coordinates. This
 * function is useful for creating bounding boxes around a point for searching for nearby points.
 *
 * @example
 *
 * ```sql
 * -- cube_enlarge ( c cube, r double, n integer ) → cube
 * cube_enlarge('(1,2),(3,4)', 0.5, 3) → (0.5, 1.5, -0.5),(3.5, 4.5, 0.5)
 * ```
 */
export function cubeEnlarge() {}
