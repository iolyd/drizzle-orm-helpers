import {
	AnyColumn,
	AnyTable,
	Column,
	InferSelectModel,
	SQL,
	SQLWrapper,
	Subquery,
	Table,
	TableConfig,
	View,
	bindIfParam,
	sql,
} from 'drizzle-orm';
import { SetNonNullable } from 'type-fest';
import { AnySelect, InferDataType } from '.';
import { Regconfig } from './constants';

/**
 * SQL random function.
 *
 * @example
 *
 * ```sql
 * random();
 * ```
 */
export function random() {
	return sql<number>`random()`;
}

/**
 * SQL json_strip_nulls.
 */
export function jsonStripNulls<T>(json: SQL<T> | SQL.Aliased<T>) {
	return sql<SetNonNullable<T>>`json_strip_nulls(${json})`;
}

/**
 * Aggregate sql values into an sql array.
 */
export function arrayAgg<T extends SQL | SQL.Aliased | InferSelectModel<AnyTable<TableConfig>>>(
	raw: T
) {
	return sql<(T extends SQL | SQL.Aliased ? InferDataType<T>[] : T[]) | null>`array_agg(${raw})`;
}

/**
 * @see https://www.postgresql.org/docs/9.5/functions-json.html#FUNCTIONS-JSON-CREATION-TABLE
 */
export function toJson<T extends SQLWrapper | AnyColumn>(anyelement: T) {
	return sql<
		T extends SQL | SQL.Aliased | Column
			? InferDataType<T>
			: T extends Table
				? InferSelectModel<T>
				: T extends View | Subquery
					? T['_']['selectedFields']
					: unknown
	>`to_json(${anyelement})`;
}

export function toJsonb<T extends SQLWrapper | AnyColumn>(anyelement: T) {
	return sql<
		T extends SQL | SQL.Aliased | Column
			? InferDataType<T>
			: T extends Table
				? InferSelectModel<T>
				: T extends View | Subquery
					? T['_']['selectedFields']
					: unknown
	>`to_jsonb(${anyelement})`;
}

/**
 * Since it is a json method, it should return an unwrapped (raw) type instead of an SQL wrapped
 * type.
 */
export function rowToJson<T extends Table | View | Subquery>(row: T) {
	return sql<
		T extends Table
			? InferSelectModel<T>
			: T extends View | Subquery
				? T['_']['selectedFields']
				: never | null
	>`row_to_json(${row})`;
}

/**
 * Build objects using `json_build_object(k1, v1, ...kn, vn). Since it is a json method, it should
 * return an object with unwrapped value types instead of SQL wrapped types.
 */
export function jsonBuildObject<T extends Record<string, AnyColumn | SQL>>(shape: T) {
	const chunks: SQL[] = [];
	Object.entries(shape).forEach(([key, value]) => {
		if (chunks.length > 0) {
			chunks.push(sql.raw(`,`));
		}
		chunks.push(sql.raw(`'${key}',`));
		chunks.push(sql`${value}`);
	});
	return sql<{ [K in keyof T]: InferDataType<T[K]> }>`json_build_object(${sql.join(chunks)})`;
}

/**
 * Aggregate sql values into a json object.
 */
export function jsonAggBuildObject<T extends Record<string, AnyColumn | SQL | SQL.Aliased>>(
	shape: T
): SQL<
	{
		[K in keyof T]: InferDataType<T[K]> extends never ? T : InferDataType<T[K]>;
	}[]
> {
	const chunks: SQL[] = [];
	Object.entries(shape).forEach(([key, value]) => {
		if (chunks.length > 0) {
			chunks.push(sql.raw(`,`));
		}
		chunks.push(sql.raw(`'${key}',`));
		chunks.push(sql`${value}`);
	});
	return sql`coalesce(json_agg(distinct json_build_object(${sql.join(chunks)})), '[]')`;
}

/**
 * Build object using `json_object_agg`. Since it is a json method, it should return an unwrapped
 * type instead of an SQL wrapped type.
 */
export function jsonObjectAgg<
	K extends AnyColumn,
	V extends SQL | AnyTable<TableConfig>,
	TK extends string | number = null extends InferDataType<K>
		? never
		: InferDataType<K> extends string | number
			? InferDataType<K>
			: never,
	TV = V extends AnyTable<TableConfig>
		? InferSelectModel<V>
		: V extends SQL
			? InferDataType<V>
			: never,
>(key: K, value: V) {
	return sql<Record<TK, TV>>`json_object_agg(${key}, ${value})`;
}

/**
 * SQL coalesce.
 */
export function coalesce<T extends SQL[]>(...values: T) {
	return sql.join([
		sql.raw('coalesce('),
		sql.join(
			values.map((v) => sql`${v}`),
			sql.raw(', ')
		),
		sql.raw(')'),
	]) as CoalesceSQL<T>;
}
type RemoveNull<T> = T extends null ? never : T;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CoalesceSQL<T extends unknown[], N extends boolean = true, R = never> = T extends [
	infer H,
	...infer T,
]
	? CoalesceSQL<
			T,
			H extends SQL | SQL.Aliased ? (null extends InferDataType<H> ? true : false) : never,
			R | RemoveNull<H extends SQL | SQL.Aliased ? InferDataType<H> : never>
		>
	: N extends true
		? SQL<R | null>
		: SQL<R>;

/**
 * Json_agg.
 */
export function jsonAgg<T extends Table | Column | Subquery | AnySelect>(
	selection: T,
	{ notNull = true }: { notNull?: boolean } = {}
): SQL<
	T extends Table
		? InferSelectModel<T>
		: T extends Column
			? InferDataType<T>[]
			: T extends Subquery
				? { [K in keyof T['_']['selectedFields']]: InferDataType<T['_']['selectedFields'][K]> }[]
				: T extends AnySelect
					? Awaited<T>
					: never
> {
	if (notNull) {
		return sql`json_agg(${selection}) filter (where ${selection} is not null)`;
	}
	return sql`json_agg(${selection})`;
}

/**
 * Get the database's currently set regconfig for text-search functionalities.
 *
 * ```sql
 * get_current_ts_config();
 * ```
 */
export function getCurrentTsConfig() {
	return sql<Regconfig>`get_current_ts_config()`;
}

/**
 * @param regconfig Laguage configuration to use when converting source text to text search vector.
 * @param text Source text to convert into a text search vector.
 *
 *   ```sql
 *   to_tsvector();
 *   --or;
 *   plainto_tsvector();
 *   ```
 */
export function toTsvector(regconfig: SQLWrapper | AnyColumn, text: unknown) {
	return sql<string>`to_tsvector(${regconfig}, ${bindIfParam(text, regconfig)})`.mapWith(String);
}

/**
 * @param regconfig Language config for the text search query.
 * @param text Source text to convert into a text search query.
 * @param config.plain Specifies if the source text should be compared as a plain (case insensitive)
 *   query.
 *
 *   ```sql
 *   to_tsvector();
 *   ```
 */
export function toTsquery(
	regconfig: SQLWrapper | AnyColumn,
	text: unknown,
	{
		plain = false,
	}: {
		plain?: boolean;
	} = {}
) {
	if (plain) {
		return sql<string>`plainto_tsquery(${regconfig}, ${bindIfParam(text, regconfig)})`.mapWith(
			String
		);
	}
	return sql<string>`to_tsquery(${regconfig}, ${bindIfParam(text, regconfig)})`.mapWith(String);
}

/**
 * Class to create a reference to your `nanoid()` Postgres function with customized presets.
 *
 * @example
 *
 * ```ts
 * const nanoid = new Nanoid({
 * 	schemaName: extensionsSchema.schemaName,
 * });
 * ```
 *
 * ...would then call.
 *
 * ```sql
 * schema.nanoid(...)
 * ```
 *
 * @param schemaName Name of the extension schema.
 * @param defaultLength The nanoid length to use by default when generating without a specified
 *   length. Lengths can be customized by passing a param to the returned `generateNanoid`
 *   function.
 * @see {@link https://github.com/iolyd/drizzle-orm-helpers/blob/main/sql/nanoid.sql Example of how to create the needed extensions and the nanoid functions} .
 */
export class Nanoid {}

// export function createGenerateNanoid({
// 	schemaName,
// 	defaultLength = NANOID_LENGTH_DEFAULT,
// }: {
// 	schemaName?: string;
// 	defaultLength?: number;
// } = {}) {
// 	const schema = schemaName ? `"${schemaName}".` : '';
// 	/**
// 	 * Generate a nanoid using postgres-nanoid.
// 	 *
// 	 * @param optimized Should the postgres extension use optimization.
// 	 * @param size The length of the nanoid generated. If explicit nullish is passed, will default to
// 	 *   the Postgres function's default size.
// 	 * @param alphabet The set of characters to pick randomly from. Defaults to
// 	 *   '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'. If explicit nullish is
// 	 *   passed, will default to the Postgres function's default alphabet.
// 	 * @see {@link /sql/nanoid.sql} for a demo of how to create the required extension and functions.
// 	 * @todo Stay up to date when default values will accept 'sql' without having to pass param to
// 	 *   sql.raw() (ref.:
// 	 *   https://discord.com/channels/1043890932593987624/1093946807911989369/1100459226087825571)
// 	 */
// 	return function generateNanoid({
// 		optimized = false,
// 		size = defaultLength,
// 		alphabet,
// 	}: {
// 		optimized?: boolean;
// 		size?: number;
// 		alphabet?: string;
// 	} = {}) {
// 		const opts: (string | number)[] = [size];
// 		if (alphabet) {
// 			opts.push(`'${alphabet}'`);
// 		}
// 		return sql
// 			.raw(`${schema}"nanoid${optimized ? '_optimized' : ''}"(${opts.join(',')})`)
// 			.mapWith(String);
// 	};
// }
