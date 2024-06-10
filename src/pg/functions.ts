import type {
	AnyColumn,
	AnyTable,
	ColumnsSelection,
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
import { type InferData } from '..';
import type { RegconfigString } from './constants';

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
export function jsonStripNulls<T>(json: T) {
	return sql<SetNonNullable<T extends SQLWrapper ? InferData<T> : T>>`json_strip_nulls(${json})`;
}

/**
 * Aggregate sql values into an sql array.
 *
 * Input values, including nulls, concatenated into an array.
 *
 * Input arrays concatenated into array of one higher dimension (inputs must all have same
 * dimensionality, and cannot be empty or null)
 *
 * @see https://www.postgresql.org/docs/9.5/functions-aggregate.html
 *
 * @todo Implement collapsing for null array with notNull option.
 */
export function arrayAgg<
	T extends SQLWrapper,
	//  N extends boolean = true
>(
	expression: T
	// { notNull = true as N }: { notNull?: N } = {}
) {
	return sql<InferData<T> | null>`array_agg(${expression})`;
}

/**
 * @see https://www.postgresql.org/docs/9.5/functions-json.html#FUNCTIONS-JSON-CREATION-TABLE
 */
export function toJson<T extends SQLWrapper>(anyelement: T) {
	return sql<InferData<T>>`to_json(${anyelement})`;
}

export function toJsonb<T extends SQLWrapper>(anyelement: T) {
	return sql<InferData<T>>`to_jsonb(${anyelement})`;
}

/**
 * Since it is a json method, it should return an unwrapped (raw) type instead of an SQL wrapped
 * type.
 */
export function rowToJson<T extends Table | View | Subquery>(row: T) {
	return sql<InferData<T>>`row_to_json(${row})`;
}

/**
 * Build objects using `json_build_object(k1, v1, ...kn, vn). Since it is a json method, it should
 * return an object with unwrapped value types instead of SQL wrapped types.
 */
export function jsonBuildObject<T extends ColumnsSelection>(shape: T) {
	const chunks: SQL[] = [];
	Object.entries(shape).forEach(([key, value]) => {
		if (chunks.length > 0) {
			chunks.push(sql.raw(`,`));
		}
		chunks.push(sql.raw(`'${key}',`));
		chunks.push(sql`${value}`);
	});
	return sql<{
		[K in keyof T]: T[K] extends SQLWrapper ? InferData<T[K]> : T[K];
	}>`json_build_object(${sql.join(chunks)})`;
}

/**
 * Build objects using `jsonb_build_object(k1, v1, ...kn, vn). Since it is a jsonb method, it should
 * return an object with unwrapped value types instead of SQL wrapped types.
 */
export function jsonbBuildObject<T extends ColumnsSelection>(shape: T) {
	const chunks: SQLChunk[] = [];
	Object.entries(shape).forEach(([key, value]) => {
		if (chunks.length > 0) {
			chunks.push(sql.raw(`,`));
		}
		chunks.push(sql.raw(`'${key}',`));
		chunks.push(sql`${value}`);
	});
	return sql<{
		[K in keyof T]: T[K] extends SQLWrapper ? InferData<T[K]> : T[K];
	}>`jsonb_build_object(${sql.join(chunks)})`;
}

/**
 * Aggregate sql values into an array of json objects using a combination of `json_agg` and
 * `jsonb_build_object`. Jsonb object building is used in lieu of json to allow use of distinct.
 */
export function jsonAggBuildObject<T extends ColumnsSelection>(
	shape: T,
	{
		distinct = true,
		// notNull,
	}: {
		distinct?: boolean;
		// notNull?: boolean;
	} = {}
) {
	return sql<
		{
			[K in keyof T]: T[K] extends SQLWrapper ? InferData<T[K]> : T[K];
		}[]
	>`coalesce(json_agg(${sql.raw(distinct ? 'distinct' : '')} ${jsonbBuildObject(shape)}), '${sql`[]`}')`;
}

/**
 * Aggregates name/value pairs as a JSON object; values can be null, but not names.
 *
 * Build object using `json_object_agg`. Since it is a json method, it should return an unwrapped
 * type instead of an SQL wrapped type.
 *
 * @example
 *
 * ```sql
 * json_object_agg(...)
 * ```
 *
 * @see https://www.postgresql.org/docs/9.5/functions-aggregate.html
 */
export function jsonObjectAgg<
	K extends AnyColumn,
	V extends SQL | SQL.Aliased | AnyTable<TableConfig>,
	TK extends string | number = null extends InferData<K>
		? never
		: InferData<K> extends string | number
			? InferData<K>
			: never,
	TV = V extends AnyTable<TableConfig> ? InferSelectModel<V> : V extends SQL ? InferData<V> : never,
>(name: K, value: V) {
	return sql<Record<TK, TV>>`json_object_agg(${name}, ${value})`;
}

/**
 * Aggregates name/value pairs as a JSON object; values can be null, but not names.
 *
 * @example
 *
 * ```sql
 * jsonb_object_agg(...)
 * ```
 *
 * @see https://www.postgresql.org/docs/9.5/functions-aggregate.html
 */
export function jsonbObjectAgg<
	K extends AnyColumn,
	V extends SQL | SQL.Aliased | AnyTable<TableConfig>,
	TK extends string | number = null extends InferData<K>
		? never
		: InferData<K> extends string | number
			? InferData<K>
			: never,
	TV = V extends AnyTable<TableConfig> ? InferSelectModel<V> : V extends SQL ? InferData<V> : never,
>(name: K, value: V) {
	return sql<Record<TK, TV>>`jsonb_object_agg(${name}, ${value})`;
}

/**
 * Aggregates values, including nulls, as a JSON array.
 *
 * @see https://www.postgresql.org/docs/9.5/functions-aggregate.html
 */
export function jsonAgg<T extends SQLWrapper, N extends boolean = true>(
	selection: T,
	{ notNull = true as N }: { notNull?: N } = {}
): SQL<N extends true ? NonNullable<InferData<T>>[] : InferData<T>[] | [null]> {
	if (notNull) {
		return sql`coalesce(json_agg(${selection}) filter (where ${selection} is not null), '[]')`;
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
	return sql<RegconfigString>`get_current_ts_config()`;
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
	{ regconfig }: { regconfig?: RegconfigString | SQLWrapper } = {}
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
		regconfig?: SQLWrapper | RegconfigString;
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

export function isEmpty<T extends SQLWrapper | unknown>(range: T) {
	return sql`isempty(${range})`.mapWith(Boolean);
}
