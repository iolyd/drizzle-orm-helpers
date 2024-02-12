import { SQL, SQLWrapper } from 'drizzle-orm';
import { customType } from 'drizzle-orm/pg-core';
import { Range } from '.';
import { GEOMETRY_TYPES, PG_DIALECT, Regconfig, SRIDS, Srid } from './constants';

/**
 * Ci-text postgres column type.
 *
 * @see https://www.postgresql.org/docs/current/citext.html
 */
export const citext = customType<{ data: string }>({
	dataType() {
		return 'citext';
	},
});

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
export const tsvector = customType<{
	data: string;
	configRequired: true;
	config: {
		sources: string[];
		language: Regconfig | SQL<Regconfig> | SQLWrapper;
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

/**
 * Implements Postgres regconfig. Useful for text search language config storage.
 *
 * @see https://www.postgresql.org/docs/current/textsearch-controls.html
 */
export const regconfig = customType<{ data: Regconfig }>({
	dataType() {
		return 'regconfig';
	},
});

/**
 * Implements Postgres timestamp range.
 *
 * @see https://orm.drizzle.team/docs/custom-types Timestamp for reference.
 * @see https://www.postgresql.org/docs/current/rangetypes.html
 *
 * @todo Add multiranges if needed.
 */
export const tsrange = customType<{ data: [Date, Date]; config: { withTimezone: boolean } }>({
	dataType(config) {
		return `ts${config?.withTimezone ? 'tz' : ''}range`;
	},
	fromDriver(value) {
		return value as [Date, Date];
	},
	toDriver(value) {
		return value;
	},
});

/**
 * Implements postgres date range.
 *
 * @see https://orm.drizzle.team/docs/custom-types Timestamp for reference.
 * @see https://www.postgresql.org/docs/current/rangetypes.html
 *
 * @todo Add multiranges if needed.
 */
export const daterange = customType<{ data: [Date, Date] }>({
	dataType() {
		return 'daterange';
	},
	fromDriver(value) {
		return value as [Date, Date];
	},
	toDriver(value) {
		return value;
	},
});

export class Cube {}
/**
 * Implements cube extension type for 3d vectors.
 *
 * @param config.schemaName Name of the schema where the `cube` extension is added.
 * @see https://www.postgresql.org/docs/current/cube.html
 */
export const cube = customType<{
	data: [x: number, y: number, z: number];
	driverData: number[];
	config?: { schemaName?: string };
}>({
	dataType(config) {
		return `${config?.schemaName ? config?.schemaName + '.' : ''}cube`;
	},
	fromDriver(value) {
		if (value.length !== 3) {
			throw new Error(
				'Expected a cube value, but value is not a properly dimensioned array of numbers.'
			);
		}
		return [value[0], value[1], value[2]];
	},
	toDriver(value) {
		return value;
	},
});

/**
 * Implements postgres int4 / int8 range type.
 *
 * @param config.size Size of integers, where `4` corresponds to `int4range` and `8`corresponds to a
 *   bigint range (int8range).
 * @see https://www.postgresql.org/docs/current/rangetypes.html
 * @todo Add multiranges if needed.
 */
export const intrange = customType<{
	data: Range;
	driverData: string;
	config: { size: 4 | 8 };
}>({
	dataType(config) {
		return `int${config?.size ?? 4}range`;
	},
	fromDriver(value) {
		if (value === 'empty') {
			return [null, null];
		}
		const matches = value.match(/(?<nums>(\d*\.?\d* *, *\d*\.?\d*))/);
		if (!matches?.groups) {
			throw new Error('Expected range string, got wrongly formatted data.');
		}
		const range = matches.groups['nums'].split(',').map((num) => Number(num));
		return [range[0], range[1]];
	},
	toDriver(value) {
		if (value[0] == null && value[1] == null) {
			return 'empty';
		}
		// Using canonical form of included lower bound and excluded upper bound.
		// See https://www.postgresql.org/docs/current/rangetypes.html#RANGETYPES-DISCRETE
		return `[${value[0]},${value[1]})`;
		// const diff = value[0] == null || value[1] == null ? 0 : value[1] - value[0];
		// return `[${value[0] ?? value[1]},${value[1] ?? value[0]}${diff ? ')' : ']'}`;
	},
});

type CoordinateBase = [longitude: number, latitude: number];

type Coordinate<T extends { z?: boolean; m?: boolean } = { z: false; m: false }> = T extends {
	z: true;
	m: true;
}
	? [...CoordinateBase, altitude: number, m: number]
	: T extends { z: true }
		? [...CoordinateBase, altitude: number]
		: T extends { m: true }
			? [...CoordinateBase, m: number]
			: CoordinateBase;

/**
 * Implements postgis point geometry type.
 *
 * @param config.schemaName Name of the schema where the PostGIS extension is added.
 * @param config.srid Id of the projection system to use for the column.
 * @param config.z Should the point coordinates include a `z` dimension, i.e. is it in 3D?
 * @param config.m Should the point coordinates include a `m` dimension (occasionnally used to
 *   contain time data)?
 * @see https://github.com/drizzle-team/drizzle-orm/issues/671
 * @see https://github.com/drizzle-team/drizzle-orm/issues/337#issuecomment-1600854417.
 */
export const point = <
	C extends { schemaName?: string; srid?: Srid; z?: boolean; m?: boolean },
	N extends string,
>(
	name: N,
	config?: C
) => {
	const extraDimensions = `${config?.z ? 'Z' : ''}${config?.m ? 'M' : ''}`;
	return customType<{
		data: { type: typeof GEOMETRY_TYPES.Point; coordinates: Coordinate<C> };
		driverData: string;
		config: C;
	}>({
		dataType(config) {
			return `${config?.schemaName ? config.schemaName + '.' : ''}geometry(Point${extraDimensions},${config?.srid ?? SRIDS.WGS84})`;
		},
		toDriver(value) {
			const zd = config?.z ? `,${config.z}` : '';
			const md = config?.m ? `,${config.m}` : '';
			return `Point${extraDimensions}(${value.coordinates[0]},${value.coordinates[1]}${zd}${md})`;
		},
		fromDriver(value) {
			const matches = value.match(
				/POINT(?<z>Z?)(?<m>M?)\((?<coordinateString>(\d+(?:\.\d*)?,? *?)*)\)/
			);
			if (!matches?.groups) {
				throw new Error(`Point geometry value (${value}) does not match the expected pattern.`);
			}
			const { z, m, coordinateString } = matches.groups;
			if ((config?.z && !z) || (config?.m && !m)) {
				throw new Error(
					`Missing dimension(s) expected according to Point column config. Value has ${JSON.stringify(
						{
							z: !!config?.z,
							m: !!config?.m,
						}
					)} but column is supposed to be typed ${JSON.stringify({ z, m })}.`
				);
			}
			const coordinates = coordinateString
				.split(',')
				.map((d) => parseFloat(d.trim())) as Coordinate<C>;
			return { type: GEOMETRY_TYPES.Point, coordinates };
		},
	})(name, config);
};
