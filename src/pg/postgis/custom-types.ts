import { customType } from 'drizzle-orm/pg-core';
import type { GeoJsonGeometryTypes, Geometry } from 'geojson';
import { SRIDS, type Srid } from './constants';

/**
 * PostGIS column type for generic or specific geographies.
 *
 * **⚠️ Warning ⚠️**
 *
 * Uses a nasty trick to get the data back as properly formatted GeoJSON rather than WKT. Expect
 * things to break.
 *
 * @see Unstable until better support for custom type custom select is available (e.g. https://github.com/drizzle-team/drizzle-orm/pull/1423)
 */
export function geography<
	TName extends string,
	TGeography extends GeoJsonGeometryTypes,
	TZ extends boolean,
	TM extends boolean,
	TSrid extends Srid,
>(name: TName, config?: { type?: TGeography; z?: TZ; m?: TM; srid?: TSrid }) {
	const z = config?.z ? 'Z' : '';
	const m = config?.m ? 'M' : '';
	const srid = config?.srid ? `,${config.srid}` : '';
	const basetype = config?.type ? config.type : z || m || srid ? 'Geography' : '';
	const type = `${basetype}${z}${m}`;
	return customType<{
		data: Extract<Geometry, { type: TGeography }>;
		driverData: string;
		config: typeof config;
	}>({
		dataType() {
			const paren = type ? `(${type}${srid})` : '';
			return `geography${paren}`;
		},
		toDriver(value) {
			return `st_transform(st_geomfromgeojson(${JSON.stringify(value)}),${srid ?? SRIDS.WEB_MERCATOR})::geography`;
		},
		fromDriver(value) {
			try {
				const parsed = JSON.parse(value);
				if (config?.type && parsed.type !== config.type) {
					throw new Error(`Expected geography type ${config.type}, got ${parsed.type}`);
				}
				return parsed;
			} catch (err) {
				throw new Error(`Failed to parse geography`, {
					cause: err,
				});
			}
		},
	})(`st_asgeojson"("${name}") as "${name}`, config);
}

/**
 * - PostGIS column type for generic or specific geometries.
 *
 * **⚠️ Warning ⚠️**
 *
 * Uses a nasty trick to get the data back as properly formatted GeoJSON rather than WKT. Expect
 * things to break.
 *
 * @see Unstable until better support for custom type custom select is available (e.g. https://github.com/drizzle-team/drizzle-orm/pull/1423)
 */
export function geometry<
	TName extends string,
	TGeometry extends GeoJsonGeometryTypes,
	TZ extends boolean,
	TM extends boolean,
	TSrid extends Srid,
>(name: TName, config?: { type?: TGeometry; z?: TZ; m?: TM; srid?: TSrid }) {
	const z = config?.z ? 'Z' : '';
	const m = config?.m ? 'M' : '';
	const srid = config?.srid ? `,${config.srid}` : '';
	const basetype = config?.type ? config.type : z || m || srid ? 'Geography' : '';
	const type = `${basetype}${z}${m}`;
	return customType<{
		data: Extract<Geometry, { type: TGeometry }>;
		driverData: string;
		config: typeof config;
	}>({
		dataType() {
			const paren = type ? `(${type}${srid})` : '';
			return `geometry${paren}`;
		},
		toDriver(value) {
			return `st_transform(st_geomfromgeojson(${JSON.stringify(value)}),${srid ?? SRIDS.WEB_MERCATOR})::geometry`;
		},
		fromDriver(value) {
			try {
				const parsed = JSON.parse(value);
				if (config?.type && parsed.type !== config.type) {
					throw new Error(`Expected geometry type ${config.type}, got ${parsed.type}`);
				}
				return parsed;
			} catch (err) {
				throw new Error(`Failed to parse geometry`, {
					cause: err,
				});
			}
		},
	})(`st_asgeojson"("${name}") as "${name}`, config);
}
