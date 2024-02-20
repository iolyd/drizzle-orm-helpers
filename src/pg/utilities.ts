import type { AnyColumn } from 'drizzle-orm';
import { SQL, sql } from 'drizzle-orm';
import { customType } from 'drizzle-orm/mysql-core';
import type { InferDataType } from '..';
import { PG_DIALECT } from '../internals';
import type { Regconfig } from './constants';

export type RangeValue<T = void> = { upper: T | null; lower: T | null };

/**
 * Get excluded column values in conflict cases. Useful for onConflictDoUpdate's set.
 *
 * @param columns Record of columns to get from the conflict's `excluded` table.
 */
export function excluded<T extends Record<string, AnyColumn>>(columns: T) {
	return (Object.keys(columns) as (keyof T)[]).reduce(
		(acc, curr) => {
			acc[curr] = sql.raw(`excluded.${columns[curr].name}`) as SQL<InferDataType<T[typeof curr]>>;
			return acc;
		},
		<{ [K in keyof T]: SQL<InferDataType<T[K]>> }>{}
	);
}

/**
 * Tsvector type for generated columns used notably for fuzzy string search.
 *
 * @param config.sources Array of source columns to generate the ts vector from.
 * @param config.langauge Language of the vector, used for stemming. (regconfig cfgname).
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
		language: Regconfig | SQL<Regconfig>;
		weighted?: boolean;
	};
}>({
	dataType(config) {
		const cfgname =
			config.language instanceof SQL
				? PG_DIALECT.sqlToQuery(config.language.inlineParams()).sql
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
