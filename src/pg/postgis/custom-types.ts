import { customType } from 'drizzle-orm/pg-core';
import type { GeoJsonGeometryTypes, Geometry } from 'geojson';
import { getSchemaPrefix, type ThisWithSchema } from '../../internals';

// type CoordinateBase = [longitude: number, latitude: number];

// type Coordinate<T extends { z?: boolean; m?: boolean } = { z: false; m: false }> = T extends {
// 	z: true;
// 	m: true;
// }
// 	? [...CoordinateBase, altitude: number, m: number]
// 	: T extends { z: true }
// 		? [...CoordinateBase, altitude: number]
// 		: T extends { m: true }
// 			? [...CoordinateBase, m: number]
// 			: CoordinateBase;

// /**
//  * Implements postgis point geometry type.
//  *
//  * @param config.schemaName Name of the schema where the PostGIS extension is added.
//  * @param config.srid Id of the projection system to use for the column.
//  * @param config.z Should the point coordinates include a `z` dimension, i.e. is it in 3D?
//  * @param config.m Should the point coordinates include a `m` dimension (occasionnally used to
//  *   contain time data)?
//  * @see https://github.com/drizzle-team/drizzle-orm/issues/671
//  * @see https://github.com/drizzle-team/drizzle-orm/issues/337#issuecomment-1600854417.
//  */
// export const point = <
// 	C extends { schemaName?: string; srid?: Srid; z?: boolean; m?: boolean },
// 	N extends string,
// >(
// 	name: N,
// 	config?: C
// ) => {
// 	const extraDimensions = `${config?.z ? 'Z' : ''}${config?.m ? 'M' : ''}`;
// 	return customType<{
// 		data: { type: typeof GEOMETRY_TYPES.Point; coordinates: Coordinate<C> };
// 		driverData: string;
// 		config: C;
// 	}>({
// 		dataType(config) {
// 			return `${config?.schemaName ? config.schemaName + '.' : ''}geometry(Point${extraDimensions},${config?.srid ?? SRIDS.WGS84})`;
// 		},
// 		toDriver(value) {
// 			const zd = config?.z ? `,${config.z}` : '';
// 			const md = config?.m ? `,${config.m}` : '';
// 			return `Point${extraDimensions}(${value.coordinates[0]},${value.coordinates[1]}${zd}${md})`;
// 		},
// 		fromDriver(value) {
// 			const matches = value.match(
// 				/POINT(?<z>Z?)(?<m>M?)\((?<coordinateString>(\d+(?:\.\d*)?,? *?)*)\)/
// 			);
// 			if (!matches?.groups) {
// 				throw new Error(`Point geometry value (${value}) does not match the expected pattern.`);
// 			}
// 			const { z, m, coordinateString } = matches.groups;
// 			if ((config?.z && !z) || (config?.m && !m)) {
// 				throw new Error(
// 					`Missing dimension(s) expected according to Point column config. Value has ${JSON.stringify(
// 						{
// 							z: !!config?.z,
// 							m: !!config?.m,
// 						}
// 					)} but column is supposed to be typed ${JSON.stringify({ z, m })}.`
// 				);
// 			}
// 			const coordinates = coordinateString
// 				.split(',')
// 				.map((d) => parseFloat(d.trim())) as Coordinate<C>;
// 			return { type: GEOMETRY_TYPES.Point, coordinates };
// 		},
// 	})(name, config);
// };

export function geometry<
	TName extends string,
	TGeometry extends GeoJsonGeometryTypes,
	TConfig extends {
		type: TGeometry;
		z?: boolean;
		m?: boolean;
	},
>(this: ThisWithSchema, name: TName, config: TConfig) {
	const schemaPrefix = getSchemaPrefix.call(this);
	return customType<{
		data: Extract<Geometry, { type: TGeometry }>;
		driverData: string;
		config: TConfig;
		configRequired: true;
	}>({
		dataType(config) {},
		toDriver(value) {},
		fromDriver(value) {},
	})(name, config);
}
