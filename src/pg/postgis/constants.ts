import type { ValueOf } from 'type-fest';

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
