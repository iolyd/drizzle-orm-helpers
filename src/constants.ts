import { LiteralUnion, ValueOf } from 'type-fest';

export const PAGE_SIZE_DEFAULT = 20;

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

export type Regconfig = LiteralUnion<ValueOf<typeof REGCONFIGS>, string>;

/**
 * Common coordinate projection systems and their Spatial Reference System ID.
 */
export const SRIDS = {
	/**
	 * Lat/Lon globe-based coordinate system. Uses degrees to represent spheroid position.
	 */
	WGS84: 4326,
	/**
	 * Lat/Lon flat-map coordinates in meters. Generally the default system used for web apps.
	 */
	WebMercator: 3857,
} as const;

export type Srid =
	| ValueOf<typeof SRIDS>
	| LiteralUnion<`${ValueOf<typeof SRIDS>}`, string | number>;

export const GEOMETRY_TYPES = {
	Point: 'Point',
	LineString: 'LineString',
	Polygon: 'Polygon',
	MultiPoint: 'MultiPoint',
	MultiLineString: 'MultiLineString',
	MultiPolygon: 'MultiPolygon',
};

export type GeometryType = ValueOf<typeof GEOMETRY_TYPES>;
