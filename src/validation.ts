import { RangeBoundType } from './constants';

/**
 * Type for returned value of postgres range data. While empty ranges normally return 'empty', they
 * are here modeled as [null, null] for convenience when binding range members or reprensentinf
 * their state for reactivity.
 */
export type Range = [number, number] | [null, null];

/**
 * Schema to validate and assert as range. Can also be used for the base of a custom validator with
 * the library of your choice.
 *
 * @example
 *
 * ```
 * // zod custom schema
 * const rangeSchema = z.custom<Range>(isRange);
 * ```
 *
 * @param config.min Minimum value of the range.
 * @param config.max Maximum value of the range.
 */
export function isRange(
	maybeRange: unknown,
	{
		min,
		max,
	}: {
		min?: number;
		max?: number;
		upper?: RangeBoundType;
		lower?: RangeBoundType;
	} = {}
): maybeRange is Range {
	if (!Array.isArray(maybeRange) || maybeRange.length !== 2) {
		return false;
	}
	if (maybeRange[0] === null && maybeRange[1] === null) {
		// For convenience, 'empty' ranges are coalesced to null-bounded tuples.
		return true;
	}
	if (maybeRange[0] > maybeRange[1]) {
		// Ascending order is not respected.
		return false;
	}
	if ((min && maybeRange[0] < min) || (max && maybeRange[1] > max)) {
		// Limits are not respected.
		return false;
	}
	return true;
}
