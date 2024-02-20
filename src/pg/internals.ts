import { RANGE_BOUND_TYPES, type RangeBoundType } from '.';

export const RANGE_BOUND_BRACKETS = {
	LOWER: {
		[RANGE_BOUND_TYPES.INCLUSIVE]: '[',
		[RANGE_BOUND_TYPES.EXCLUSIVE]: '(',
	},
	UPPER: {
		[RANGE_BOUND_TYPES.INCLUSIVE]: ']',
		[RANGE_BOUND_TYPES.EXCLUSIVE]: ')',
	},
} satisfies Record<'UPPER' | 'LOWER', Record<RangeBoundType, string>>;
