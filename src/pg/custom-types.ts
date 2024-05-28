import { customType } from 'drizzle-orm/pg-core';
import parseDate from 'postgres-date';
import * as range from 'postgres-range';
import { RANGE_EMPTY, type RangeValue } from '.';
import type { RangeBoundType, Regconfig } from './constants';
import { RANGE_BOUND_BRACKETS } from './internals';

/**
 * Text-based enum with runtime check and type inferrence. In other words, similar to drizzle's own
 * `text` column with `config.enum` but this time with runtime peace-of mind.
 *
 * If you simply want a union-typed text without runtime safety of values, use drizzle's own `text`
 * with the `config.enum` configuration.
 *
 * @see https://orm.drizzle.team/docs/column-types/pg#text
 */
export function textenum<
	TName extends string,
	const TEnum extends string[] | Readonly<string[]>,
	TConfig extends {
		enum: TEnum;
		fallback: TConfig['enum'][number] | Error | ((value: string) => TConfig['enum'][number]);
	},
>(name: TName, config: TConfig) {
	function isEnumMember(value: unknown): value is TEnum[number] {
		return config.enum.includes(value as TEnum[number]);
	}
	return customType<{
		data: TConfig['enum'][number];
		driverData: string;
		config: TConfig;
	}>({
		dataType() {
			return 'text';
		},
		fromDriver(value) {
			if (isEnumMember(value)) {
				return value;
			}
			if (config.fallback instanceof Error) {
				throw config.fallback;
			}
			if (typeof config.fallback === 'function') {
				return config.fallback(value);
			}
			return config.fallback;
		},
		toDriver(value) {
			if (isEnumMember(value)) {
				return value;
			}
			if (config.fallback instanceof Error) {
				throw config.fallback;
			}
			if (typeof config.fallback === 'function') {
				return config.fallback(value);
			}
			return config.fallback;
		},
	})(name, config);
}

/**
 * Implements Postgres regconfig. Useful for text search language config storage.
 *
 * @see https://www.postgresql.org/docs/current/textsearch-controls.html
 */
export const regconfig = customType<{ data: Regconfig }>({
	dataType() {
		return 'regconfig';
	},
	toDriver(value) {
		return `${value}`;
	},
});

/**
 * Postgres text-search vector.
 */
export const tsvector = customType<{ data: string }>({
	dataType() {
		return 'tsvector';
	},
});

/**
 * Implements Postgres timestamp range.
 *
 * @see https://www.postgresql.org/docs/current/rangetypes.html
 * @see https://github.com/bendrucker/postgres-date
 */
export function tsrange<
	TName extends string,
	TConfig extends {
		withTimezone?: boolean;
		mode?: 'date' | 'string';
		lowerBound?: RangeBoundType;
		upperBound?: RangeBoundType;
	},
	TData = TConfig['mode'] extends 'string' ? RangeValue<string> : RangeValue<number | Date>,
>(name: TName, config?: TConfig) {
	return customType<{
		data: TData;
		driverData: string;
		config: TConfig;
	}>({
		dataType(config) {
			const tz = config?.withTimezone ? 'tz' : '';
			return `ts${tz}range`;
		},
		fromDriver(value) {
			const parsed = range.parse(value, (value) => {
				if (config?.mode === 'string') {
					return value;
				}
				return parseDate(value);
			});
			if (parsed.isEmpty()) {
				return RANGE_EMPTY as TData;
			}
			return { lower: parsed.lower, upper: parsed.upper } as TData;
		},
		toDriver(value) {
			if (value === null || typeof value !== 'object' || !('lower' in value && 'upper' in value)) {
				throw new Error(
					'Value passed to driver for range should be an object with lower and upper properties.'
				);
			}
			const lower = value.lower instanceof Date ? value.lower.toISOString() : value.lower ?? '';
			const upper = value.upper instanceof Date ? value.upper.toISOString() : value.upper ?? '';
			// Using canonical form of included lower bound and excluded upper bound.
			// See https://www.postgresql.org/docs/current/rangetypes.html#RANGETYPES-DISCRETE
			const lb = RANGE_BOUND_BRACKETS.LOWER[config?.lowerBound ?? 'inclusive'];
			const ub = RANGE_BOUND_BRACKETS.UPPER[config?.upperBound ?? 'exclusive'];
			return `${lb}${lower},${upper}${ub}`;
		},
	})(name, config);
}

/**
 * Implements postgres date range.
 *
 * @see https://orm.drizzle.team/docs/custom-types Timestamp for reference.
 * @see https://www.postgresql.org/docs/current/rangetypes.html
 */
export function daterange<
	TName extends string,
	TConfig extends {
		mode?: 'date' | 'string';
		lowerBound?: RangeBoundType;
		upperBound?: RangeBoundType;
	},
	TData = TConfig['mode'] extends 'string' ? RangeValue<string> : RangeValue<number | Date>,
>(name: TName, config?: TConfig) {
	return customType<{
		data: TData;
		driverData: string;
		config: TConfig;
	}>({
		dataType() {
			return 'daterange';
		},
		fromDriver(value) {
			const parsed = range.parse(value, (value) => {
				if (config?.mode === 'string') {
					return value;
				}
				return parseDate(value);
			});
			if (parsed.isEmpty()) {
				return RANGE_EMPTY as TData;
			}
			return { lower: parsed.lower, upper: parsed.upper } as TData;
		},
		toDriver(value) {
			if (value === null || typeof value !== 'object' || !('lower' in value && 'upper' in value)) {
				throw new Error(
					'Value passed to driver for range should be an object with lower and upper properties.'
				);
			}
			const lower = value.lower instanceof Date ? value.lower.toISOString() : value.lower ?? '';
			const upper = value.upper instanceof Date ? value.upper.toISOString() : value.upper ?? '';
			// Using canonical form of included lower bound and excluded upper bound.
			// See https://www.postgresql.org/docs/current/rangetypes.html#RANGETYPES-DISCRETE
			const lb = RANGE_BOUND_BRACKETS.LOWER[config?.lowerBound ?? 'inclusive'];
			const ub = RANGE_BOUND_BRACKETS.UPPER[config?.upperBound ?? 'exclusive'];
			return `${lb}${lower},${upper}${ub}`;
		},
	})(name, config);
}

/**
 * Implements postgres int4range and int8range types.
 *
 * @param config.size Size of integers, where `4` corresponds to `int4range` and `8`corresponds to a
 *   bigint range (int8range).
 * @see https://www.postgresql.org/docs/current/rangetypes.html
 */
export function intrange<
	TName extends string,
	TConfig extends {
		size?: 4 | 8;
		lowerBound?: RangeBoundType;
		upperBound?: RangeBoundType;
	},
>(name: TName, config?: TConfig) {
	return customType<{
		data: RangeValue<number>;
		driverData: string;
		config: TConfig;
	}>({
		dataType(config) {
			const size = config?.size ?? 4;
			return `int${size}range`;
		},
		fromDriver(value) {
			const parsed = range.parse(value, (value) => {
				return parseInt(value, 10);
			});
			if (parsed.isEmpty()) {
				return RANGE_EMPTY;
			}
			return { lower: parsed.lower, upper: parsed.upper };
		},
		toDriver(value) {
			// Using canonical form of included lower bound and excluded upper bound.
			// See https://www.postgresql.org/docs/current/rangetypes.html#RANGETYPES-DISCRETE
			const lb = RANGE_BOUND_BRACKETS.LOWER[config?.lowerBound ?? 'inclusive'];
			const ub = RANGE_BOUND_BRACKETS.UPPER[config?.upperBound ?? 'exclusive'];
			return `${lb}${value.lower ?? ''},${value.upper ?? ''}${ub}`;
		},
	})(name, config);
}

/**
 * Implements postgres numrange type.
 *
 * @see https://www.postgresql.org/docs/current/rangetypes.html
 */
export function numrange<
	TName extends string,
	TConfig extends {
		lowerBound?: RangeBoundType;
		upperBound?: RangeBoundType;
	},
>(name: TName, config?: TConfig) {
	return customType<{
		data: RangeValue<number>;
		driverData: string;
		config: TConfig;
	}>({
		dataType() {
			return 'numrange';
		},
		fromDriver(value) {
			const parsed = range.parse(value, (value) => {
				return parseFloat(value);
			});
			if (parsed.isEmpty()) {
				return RANGE_EMPTY;
			}
			return { lower: parsed.lower, upper: parsed.upper };
		},
		toDriver(value) {
			// Using canonical form of included lower bound and excluded upper bound.
			// See https://www.postgresql.org/docs/current/rangetypes.html#RANGETYPES-DISCRETE
			const lb = RANGE_BOUND_BRACKETS.LOWER[config?.lowerBound ?? 'inclusive'];
			const ub = RANGE_BOUND_BRACKETS.UPPER[config?.upperBound ?? 'exclusive'];
			return `${lb}${value.lower ?? ''},${value.upper ?? ''}${ub}`;
		},
	})(name, config);
}
