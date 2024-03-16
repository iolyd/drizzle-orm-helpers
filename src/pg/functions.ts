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
import type { RangeBoundType, Regconfig } from './constants';
import { RANGE_BOUND_BRACKETS } from './internals';

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
export function now() {
	return sql<Date>`now()`;
}

/**
 * True if all input values are true, otherwise false.
 */
export function boolAnd(...expression: SQLWrapper[]) {
	return sql<boolean>`bool_and(${sql.join(expression, new StringChunk(', '))})`;
}

/**
 * True if at least one input value is true, otherwise false.
 */
export function boolOr(...expression: SQLWrapper[]) {
	return sql<boolean>`bool_or(${sql.join(expression, new StringChunk(', '))})`;
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
 *
 * @example
 *
 * ```sql
 * json_object_agg(...)
 * ```
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
>(name: K, value: V) {
	return sql<Record<TK, TV>>`json_object_agg(${name}, ${value})`;
}

/**
 * @example
 *
 * ```sql
 * jsonb_object_agg(...)
 * ```
 */
export function jsonbObjectAgg<
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
>(name: K, value: V) {
	return sql<Record<TK, TV>>`jsonb_object_agg(${name}, ${value})`;
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

/**
 * The function setweight can be used to label the entries of a tsvector with a given weight, where
 * a weight is one of the letters A, B, C, or D. This is typically used to mark entries coming from
 * different parts of a document, such as title versus body. Later, this information can be used for
 * ranking of search results.
 *
 * Because to_tsvector(NULL) will return NULL, it is recommended to use coalesce whenever a field
 * might be null.
 */
export function setweight(tsvector: SQLWrapper, weight: string | number) {
	const char = typeof weight === 'string' ? weight : String.fromCharCode(weight + 65);
	return sql`setweight(${tsvector}, ${char})`.mapWith(String);
}

/**
 * Subtract arguments, producing a “symbolic” result that uses years and months, rather than just
 * days.
 *
 * @example
 *
 * ```sql
 * -- age ( timestamp, timestamp ) → interval
 * age(timestamp '2001-04-10', timestamp '1957-06-13') → 43 years 9 mons 27 days
 * ```
 */
export function age<TOrigin extends SQLWrapper | Date, TTarget extends SQLWrapper | Date>(
	origin: TOrigin,
	target: TTarget
) {
	return sql`age(${origin},${target})`.mapWith(String);
}

/**
 * Using canonical form of included lower bound and excluded upper bound. See
 * https://www.postgresql.org/docs/current/rangetypes.html#RANGETYPES-DISCRETE.
 */
export function range<
	const T extends [number | undefined, number | undefined] | [Date | undefined, Date | undefined],
>(
	tuple: T,
	{
		lowerBound = 'inclusive',
		upperBound = 'exclusive',
	}: { lowerBound?: RangeBoundType; upperBound?: RangeBoundType } = {}
) {
	const lb = RANGE_BOUND_BRACKETS.LOWER[lowerBound];
	const ub = RANGE_BOUND_BRACKETS.UPPER[upperBound];
	return sql<T>`${lb}${tuple[0]},${tuple[1]}${ub}`;
}
