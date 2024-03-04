import type { ValueOf } from 'type-fest';

export const DISTANCE_TYPES = {
	EUCLIDIAN: 'euclidian',
	TAXICAB: 'taxicab',
	CHEBYSHEV: 'chebyshev',
} as const;
export type DistanceType = ValueOf<typeof DISTANCE_TYPES>;

export const DISTANCE_TYPES_OPERATORS = {
	[DISTANCE_TYPES.EUCLIDIAN]: '<->',
	[DISTANCE_TYPES.TAXICAB]: '<#>',
	[DISTANCE_TYPES.CHEBYSHEV]: '<=>',
} as const satisfies Record<DistanceType, string>;
