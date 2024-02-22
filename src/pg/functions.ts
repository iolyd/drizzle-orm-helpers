import type {
	AnyColumn,
	AnyTable,
	Column,
	InferSelectModel,
	SQLChunk,
	SQLWrapper,
	Subquery,
	Table,
	TableConfig,
	View,
} from 'drizzle-orm';
import { SQL, StringChunk, bindIfParam, isSQLWrapper, sql } from 'drizzle-orm';
import type { SetNonNullable } from 'type-fest';
import type { AnySelect, InferDataType } from '..';
import type { Regconfig } from './constants';

/**
 * Postgres random function.
 *
 * @example
 *
 * ```sql
 * random();
 * ```
 *
 * @returns Random number between 0 and 1.
 */
export function random() {
	return sql<number>`random()`;
}

/**
 * Get the current time (dynamically).
 *
 * @example
 *
 * ```sql
 * now();
 * ```
 */
export function getNow() {
	return sql<Date>`now()`;
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
export function toJson<T extends SQLWrapper>(anyelement: T) {
	return sql<InferDataType<T>>`to_json(${anyelement})`;
}

export function toJsonb<T extends SQLWrapper>(anyelement: T) {
	return sql<InferDataType<T>>`to_jsonb(${anyelement})`;
}

/**
 * Since it is a json method, it should return an unwrapped (raw) type instead of an SQL wrapped
 * type.
 */
export function rowToJson<T extends Table | View | Subquery>(row: T) {
	return sql<InferDataType<T>>`row_to_json(${row})`;
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
	V extends SQL | SQL.Aliased | AnyTable<TableConfig>,
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
export function toTsvector(
	text: unknown,
	{ regconfig }: { regconfig?: Regconfig | SQLWrapper } = {}
) {
	if (regconfig) {
		const value = isSQLWrapper(regconfig) ? bindIfParam(text, regconfig) : text;
		return sql`to_tsvector(${regconfig}, ${value})`.mapWith(String);
	}
	return sql`to_tsvector(${text})`.mapWith(String);
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
	text: unknown,
	{
		plain = false,
		regconfig,
	}: {
		plain?: boolean;
		regconfig?: SQLWrapper | Regconfig;
	} = {}
) {
	const start = new StringChunk(plain ? 'plainto_tsquery(' : 'to_tsquery(');
	const end = new StringChunk(')');
	const chunks: SQLChunk[] = [];
	if (regconfig) {
		chunks.push(sql`${regconfig},`);
	}
	chunks.push(isSQLWrapper(regconfig) ? sql`${bindIfParam(text, regconfig)}` : sql`${text}`);
	return new SQL([start, sql.join(chunks, new StringChunk(' ')), end]).mapWith(String);
}

export function setweight(tsvector: SQLWrapper, weight: string | number) {
	const char = typeof weight === 'string' ? weight : String.fromCharCode(weight + 65);
	return sql`setweight(${tsvector}, ${char})`.mapWith(String);
}