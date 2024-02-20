import type { ValueOf } from 'type-fest';

/**
 * Postgres regconfig cfgnames.
 *
 * @example
 *
 * ```sql
 * SELECT json_object_agg(upper(cfgname), cfgname)
 * FROM pg_catalog.pg_ts_config;
 * ```
 */
export const REGCONFIGS = {
	SIMPLE: 'simple',
	ARABIC: 'arabic',
	ARMENIAN: 'armenian',
	BASQUE: 'basque',
	CATALAN: 'catalan',
	DANISH: 'danish',
	DUTCH: 'dutch',
	ENGLISH: 'english',
	FINNISH: 'finnish',
	FRENCH: 'french',
	GERMAN: 'german',
	GREEK: 'greek',
	HINDI: 'hindi',
	HUNGARIAN: 'hungarian',
	INDONESIAN: 'indonesian',
	IRISH: 'irish',
	ITALIAN: 'italian',
	LITHUANIAN: 'lithuanian',
	NEPALI: 'nepali',
	NORWEGIAN: 'norwegian',
	PORTUGUESE: 'portuguese',
	ROMANIAN: 'romanian',
	RUSSIAN: 'russian',
	SERBIAN: 'serbian',
	SPANISH: 'spanish',
	SWEDISH: 'swedish',
	TAMIL: 'tamil',
	TURKISH: 'turkish',
	YIDDISH: 'yiddish',
} as const;

export type Regconfig = ValueOf<typeof REGCONFIGS>;

export const RANGE_EMPTY = [null, null] as [null, null];

export type RangeEmpty = typeof RANGE_EMPTY;

export const RANGE_BOUND_TYPES = {
	INCLUSIVE: 'inclusive',
	EXCLUSIVE: 'exclusive',
} as const;

export type RangeBoundType = ValueOf<typeof RANGE_BOUND_TYPES>;

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
