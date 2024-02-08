import { PgDialect } from 'drizzle-orm/pg-core';
import { ValueOf } from 'type-fest';

export const PG_DIALECT = new PgDialect();

export const PAGE_SIZE_DEFAULT = 20;

export const NANOID_LENGTH_DEFAULT = 15;

export const NANOID_ALPHABET_DEFAULT =
	'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

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

/**
 * Common coordinate projection systems and their Spatial Reference System ID (EPSG).
 *
 * @example
 *
 * ```sql
 * SELECT * FROM extensions.spatial_ref_sys;
 * ```
 *
 * @todo Add more aliased systems.
 */
export const SRIDS = {
	/**
	 * Lat/Lon globe-based coordinate system. Uses degrees to represent spheroid position.
	 */
	WGS84: 4326,
	/**
	 * Lat/Lon flat-map coordinates in meters. Generally the default system used for web apps.
	 */
	WEB_MERCATOR: 3857,
} as const;

export type Srid = ValueOf<typeof SRIDS> | `${ValueOf<typeof SRIDS>}`;

/**
 * GeoJSON geometry types accepted by PostGIS.
 */
export const GEOMETRY_TYPES = {
	Point: 'Point',
	LineString: 'LineString',
	Polygon: 'Polygon',
	MultiPoint: 'MultiPoint',
	MultiLineString: 'MultiLineString',
	MultiPolygon: 'MultiPolygon',
};

export type GeometryType = ValueOf<typeof GEOMETRY_TYPES>;

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
