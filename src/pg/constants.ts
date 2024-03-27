import type { ValueOf } from 'type-fest';
import type { RangeValue } from '.';

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

export type RegconfigString = Regconfig | (string & NonNullable<unknown>);

export const RANGE_BOUND_TYPES = {
	INCLUSIVE: 'inclusive',
	EXCLUSIVE: 'exclusive',
} as const;

export type RangeBoundType = ValueOf<typeof RANGE_BOUND_TYPES>;

/**
 * Value for app-side representation of empty postgres ranges.
 */
export const RANGE_EMPTY = { lower: null, upper: null } satisfies RangeValue;

export const INTERVAL_UNITS = {
	YEARS: 'years',
	MONTHS: 'months',
	WEEKS: 'weeks',
	DAYS: 'days',
	HOURS: 'hours',
	MINUTES: 'minutes',
	SECONDS: 'seconds',
} as const;

export type IntervalUnit = ValueOf<typeof INTERVAL_UNITS>;

export const INTERVAL_UNITS_ARR_ORDERED = [
	INTERVAL_UNITS.YEARS,
	INTERVAL_UNITS.MONTHS,
	INTERVAL_UNITS.WEEKS,
	INTERVAL_UNITS.DAYS,
	INTERVAL_UNITS.HOURS,
	INTERVAL_UNITS.MINUTES,
	INTERVAL_UNITS.SECONDS,
] as const;
