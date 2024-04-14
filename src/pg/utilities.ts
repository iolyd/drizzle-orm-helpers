import { SQL, StringChunk, isSQLWrapper, sql, type AnyColumn, type SQLWrapper } from 'drizzle-orm';
import { customType } from 'drizzle-orm/pg-core';
import { INTERVAL_UNITS_ARR_ORDERED, type IntervalUnit, type RangeBoundType } from '.';
import type { InferData } from '..';
import { PG_DIALECT } from '../internals';
import { RANGE_BOUND_BRACKETS } from './internals';

export type RangeValue<T = void> = { upper: T | null; lower: T | null };

/**
 * Get excluded column values in conflict cases. Useful for onConflictDoUpdate's set.
 *
 * @param columns Record of columns to get from the conflict's `excluded` table.
 */
export function toExcluded<T extends Record<string, AnyColumn>>(columns: T) {
	return (Object.keys(columns) as (keyof T)[]).reduce(
		(acc, curr) => {
			acc[curr] = sql.raw(`excluded.${columns[curr].name}`) as SQL<InferData<T[typeof curr]>>;
			return acc;
		},
		<{ [K in keyof T]: SQL<InferData<T[K]>> }>{}
	);
}

/**
 * Tsvector type for generated columns used notably for fuzzy string search.
 *
 * @param config.sources Array of source columns to generate the ts vector from.
 * @param config.langauge Regconfig column or sql value (conditional values, or other) to use for
 *   the vector, used for stemming. (regconfig cfgname).
 * @param config.weighted If true, concatenated sources will be weighted by their order.
 * @see https://github.com/drizzle-team/drizzle-orm/issues/247
 * @todo Implementation isn't clean. Figure out a better way to map the language name and column
 *   references, or stay up to date on support for `generatedAs()`.
 */
export const generatedTsvector = customType<{
	data: string;
	configRequired: true;
	config: {
		sources: string[];
		language: string | SQLWrapper;
		weighted?: boolean;
	};
}>({
	dataType(config) {
		const cfgname = isSQLWrapper(config.language)
			? PG_DIALECT.sqlToQuery(config.language.getSQL().inlineParams()).sql
			: config.language;
		if (config.weighted) {
			const weighted = config.sources.map((input, index) => {
				const weight = String.fromCharCode(index + 65);
				return `setweight(to_tsvector(${cfgname}, coalesce(${input}, '')), '${weight}')`;
			});
			return `tsvector generated always as (${weighted.join(' || ')}) stored`;
		} else {
			const source = config.sources.join(" || ' ' || ");
			return `tsvector generated always as (to_tsvector(${config.language}, ${source})) stored`;
		}
	},
});

/**
 * Create an interval value by passing a value deconstructed into time units.
 */
export function toInterval<T extends Partial<Record<IntervalUnit, number>>>(value: T) {
	const units = INTERVAL_UNITS_ARR_ORDERED.reduce(
		(acc, curr) => {
			if (value[curr] != null) {
				acc.push(new SQL([sql`${value[curr]}`, new StringChunk(` ${curr}`)]));
			}
			return acc;
		},
		<SQL[]>[]
	);
	return new SQL([
		new StringChunk("(interval '"),
		sql.join(units, new StringChunk(' ')),
		new StringChunk("')"),
	]).mapWith(String);
}

/**
 * Using canonical form of included lower bound and excluded upper bound. See
 * https://www.postgresql.org/docs/current/rangetypes.html#RANGETYPES-DISCRETE.
 */
export function toRange<
	const T extends [number | undefined, number | undefined] | [Date | undefined, Date | undefined],
>(
	tuple: T,
	{
		lowerBound = 'inclusive',
		upperBound = 'exclusive',
	}: { lowerBound?: RangeBoundType; upperBound?: RangeBoundType } = {}
) {
	const lb = RANGE_BOUND_BRACKETS.LOWER[lowerBound];
	const ub = RANGE_BOUND_BRACKETS.UPPER[upperBound];
	return sql<T>`${lb}${tuple[0]},${tuple[1]}${ub}`;
}
