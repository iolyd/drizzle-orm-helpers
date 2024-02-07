import {
	AnyColumn,
	AnyTable,
	Column,
	ColumnBuilderBase,
	InferSelectModel,
	SQL,
	SQLWrapper,
	Subquery,
	Table,
	View,
	bindIfParam,
	sql,
} from 'drizzle-orm';
import { AnyMySqlSelect, MySqlSelect, TableConfig } from 'drizzle-orm/mysql-core';
import { AnyPgSelect, PgSelect } from 'drizzle-orm/pg-core';
import { AnySQLiteSelect, SQLiteSelect } from 'drizzle-orm/sqlite-core';
import type { SetNonNullable, SetOptional } from 'type-fest';

/**
 * Dialect agnostic select.
 *
 * @see PgSelect.
 * @see MySqlSelect
 * @see SQLiteSelect
 */
export type Select = SetOptional<PgSelect | MySqlSelect | SQLiteSelect, 'where'>;

/**
 * Dialect agnostic AnySelect.
 *
 * @see AnyPgSelect
 * @see AnyMySqlSelect
 * @see AnySQLiteSelect
 */
export type AnySelect = SetOptional<AnyPgSelect | AnyMySqlSelect | AnySQLiteSelect, 'where'>;

/**
 * Infer type of table column.
 */
export type InferColumnType<T extends (...config: never[]) => ColumnBuilderBase> = AnyColumn<
	Pick<ReturnType<T>['_'], 'data' | 'dataType'>
>;

/**
 * Infer SQL template or column data type.
 */
export type InferDataType<T extends Column | SQL | SQL.Aliased> = T extends Column
	? T['_']['notNull'] extends true
		? T['_']['dataType']
		: T['_']['dataType'] | null
	: T extends SQL<infer U>
		? U
		: T extends SQL.Aliased<infer U>
			? U
			: never;

/**
 * Empty record as SQL json.
 */
export const emptyJsonObject = sql<object>`'{}'::json`;

/**
 * Empty array as SQL json.
 */
export const emptyJsonArray = sql<[never]>`'[]'::json`;

/**
 * Empty SQL array (not json typed)
 */
export const emptySqlArray = sql<SQL<[]>>`{}`;

/**
 * SQL template true value.
 */
export const tru = sql<true>`'true'`;

/**
 * SQL template false value.
 */
export const fal = sql<false>`'false'`;

/**
 * SQL template boolean value.
 */
export function bool<T extends boolean>(value: T) {
	return sql<T>`${value ? 'true' : 'false'}`;
}

/**
 * SQL template null value.
 */
export const nul = sql<null>`null`;

/**
 * SQL json_strip_nulls.
 */
export function jsonStripNulls<T>(json: SQL<T> | SQL.Aliased<T>) {
	return sql<SetNonNullable<T>>`json_strip_nulls(${json})`;
}

/**
 * SQL random function.
 */
export function random() {
	return sql<number>`random()`;
}

/**
 * When statement.
 */
export function wn(condition: SQLWrapper, statement: unknown) {
	return sql`when ${condition} then ${statement}`;
}

/**
 * Else statement for fallback statement in condition tree.
 */
export function el(statement: SQLWrapper) {
	return sql`else ${statement}`;
}

/**
 * Case condition chain.
 */
export function cs(...statements: SQLWrapper[]) {
	return sql.join([sql`case`, ...statements, sql`end`]);
}

/**
 * Get excluded column values in conflict cases. Useful for onConflictDoUpdate's set.
 *
 * @param columns Record of columns to get from the conflict's `excluded` table.
 */
export function excluded<T extends Record<string, AnyColumn>>(columns: T) {
	return (Object.keys(columns) as (keyof T)[]).reduce(
		(acc, curr) => {
			acc[curr] = sql.raw(`excluded.${columns[curr].name}`) as SQL<InferDataType<T[typeof curr]>>;
			return acc;
		},
		<{ [K in keyof T]: SQL<InferDataType<T[K]>> }>{}
	);
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

export function toTsvector(language: SQLWrapper | AnyColumn, text: unknown) {
	return sql<string>`to_tsvector(${language}, ${bindIfParam(text, language)})`.mapWith(String);
}

export function toTsquery(language: SQLWrapper | AnyColumn, text: unknown) {
	return sql<string>`to_tsquery(${language}, ${bindIfParam(text, language)})`.mapWith(String);
}

export function plaintoTsquery(language: SQLWrapper, text: unknown) {
	return sql<string>`plainto_tsquery(${language}, ${bindIfParam(text, language)})`.mapWith(String);
}

/**
 * Test a text search query against a ts_vector value.
 */
export function ts(vector: SQLWrapper, querytext: SQLWrapper) {
	return sql`${vector} @@ ${bindIfParam(querytext, vector)}`;
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
