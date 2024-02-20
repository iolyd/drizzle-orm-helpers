import { StringChunk, isSQLWrapper, sql, type SQLWrapper } from 'drizzle-orm';
import type { Geometry } from 'geojson';

/**
 * @example
 *
 * ```sql
 * st_astext(geometry or geography);
 * ```
 */
export function stAstext(geo: SQLWrapper) {
	return sql`st_astext(${geo})`;
}

/**
 * @example
 *
 * ```sql
 * ST_AsGeoJSON(geom or geog)
 * ```
 *
 * @see https://postgis.net/docs/ST_AsGeoJSON.html
 */
export function stAsGeoJSON(geo: SQLWrapper) {
	return sql`st_asgeojson(${geo})`;
}

/**
 * @example
 *
 * ```sql
 * ST_GeomFromGeoJSON(geojson);
 * ```
 */
export function stGeomFromGeoJSON(geojson: SQLWrapper | Geometry) {
	const param = isSQLWrapper(geojson) ? geojson : JSON.stringify(geojson);
	return sql`st_geomfromgeojson(${param})::geography`.mapWith(String);
}

/**
 * @example
 *
 * ```sql
 * st_point(long, lat);
 * ```
 */
export function stPoint(
	longitude: SQLWrapper | string | number,
	lattitude: SQLWrapper | string | number
) {
	return sql`st_point(${longitude}, ${lattitude})`;
}

/**
 * @example
 *
 * ```sql
 * st_distance(point, point);
 * ```
 */
export function stDistance(
	...points: [SQLWrapper | string | number, SQLWrapper | string | number]
) {
	const chunks = sql.join(points, new StringChunk(','));
	return sql`st_distance(${chunks})`;
}
