import { customType } from 'drizzle-orm/pg-core';
import { GEOMETRY_TYPES, Srid, SRIDS } from './constants';
import type { Range } from './utilities';

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
 * @see https://github.com/drizzle-team/drizzle-orm/issues/247
 */
export const tsvector = customType<{
	data: string;
	configRequired: true;
	config: {
		/**
		 * Array of source columns to generate the ts vector from.
		 */
		sources: string[];
		/**
		 * Language of the vector, used for stemming. (regconfig cfgname).
		 */
		language: string;
		/**
		 * Should sources be weighted by their order.
		 */
		weighted?: boolean;
	};
}>({
	dataType(config) {
		if (config.weighted) {
			const weighted = config.sources.map((input, index) => {
				const weight = String.fromCharCode(index + 65);
				return `setweight(to_tsvector(${config.language}, coalesce(${input}, '')), '${weight}')`;
			});
			return `tsvector generated always as (${weighted.join(' || ')}) stored`;
		} else {
			const source = config.sources.join(" || ' ' || ");
			return `tsvector generated always as (to_tsvector(${config.language}, ${source})) stored`;
		}
	},
});

/**
 * Implements postgres timestamp range.
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

/**
 * Implements cube extension type for 3d vectors.
 *
 * @see https://www.postgresql.org/docs/current/cube.html
 */
export const cube = customType<{ data: [x: number, y: number, z: number]; driverData: number[] }>({
	dataType() {
		return 'extensions.cube';
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
 * @see https://www.postgresql.org/docs/current/rangetypes.html
 *
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
			return `extensions.geometry(Point${extraDimensions},${config?.srid ?? SRIDS.WGS84})`;
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
