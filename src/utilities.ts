import {
	AnyColumn,
	Column,
	ColumnBuilderBase,
	SQL,
	SQLWrapper,
	Subquery,
	SubqueryConfig,
	Table,
	View,
	ViewBaseConfig,
	eq,
	is,
	sql,
} from 'drizzle-orm';
import { AnyMySqlSelect, MySqlSelect } from 'drizzle-orm/mysql-core';
import { AnyPgSelect, PgSelect } from 'drizzle-orm/pg-core';
import { AnySQLiteSelect, SQLiteSelect } from 'drizzle-orm/sqlite-core';
import { SetOptional } from 'type-fest';
import { NANOID_SIZE_DEFAULT, PAGE_SIZE_DEFAULT, Regconfig } from './constants';
import { cs, wn } from './expressions';

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
 * Should replace `getTableColumns` to allow for more input versatility.
 *
 * @see https://github.com/drizzle-team/drizzle-orm/pull/1789
 */
export function getColumns<T extends Table | View | Subquery | AnySelect>(
	table: T
): T extends Table
	? T['_']['columns']
	: T extends View
		? T['_']['selectedFields']
		: T extends Subquery
			? T['_']['selectedFields']
			: T extends AnySelect
				? T['_']['selectedFields']
				: never {
	return is(table, Table)
		? // eslint-disable-next-line @typescript-eslint/no-explicit-any
			(table as any)[(Table as any).Symbol.Columns]
		: is(table, View)
			? // eslint-disable-next-line @typescript-eslint/no-explicit-any
				(table as any)[ViewBaseConfig].selectedFields
			: is(table, Subquery)
				? // eslint-disable-next-line @typescript-eslint/no-explicit-any
					(table as any)[SubqueryConfig].selection
				: // eslint-disable-next-line @typescript-eslint/no-explicit-any
					(table as any)._.selectedFields;
}

export function getNameOrAlias<T extends Table | View | Subquery | AnySelect>(
	table: T
): T extends Table
	? T['_']['name']
	: T extends View
		? T['_']['name']
		: T extends Subquery
			? T['_']['alias']
			: T extends AnySelect
				? T['_']['tableName']
				: never {
	return is(table, Table)
		? // eslint-disable-next-line @typescript-eslint/no-explicit-any
			(table as any)[(Table as any).Symbol.Name]
		: is(table, View)
			? // eslint-disable-next-line @typescript-eslint/no-explicit-any
				(table as any)[ViewBaseConfig].name
			: is(table, Subquery)
				? // eslint-disable-next-line @typescript-eslint/no-explicit-any
					(table as any)[SubqueryConfig].alias
				: // eslint-disable-next-line @typescript-eslint/no-explicit-any
					(table as any).tableName;
}

/**
 * @example
 *
 * ```
 * const regconfig = createRegconfig({...})
 * ```
 *
 * @param languageTags Lookup dictionnary used as a reference to match your app's language tags with
 *   Postgres's regconfig language names.
 */
export function RegconfigMatcher<T extends Record<string, Regconfig>>(languageTags: T) {
	const languageTagsArr = Object.keys(languageTags);
	/**
	 * Use this sql switch to retrieve an sql langauge tag statement's corresponding regconfig name.
	 */
	return function getRegconfig(languageTag: SQLWrapper) {
		return cs(
			...languageTagsArr.map((tag) =>
				wn(eq(languageTag, tag), sql`${languageTags[tag]}::regconfig`)
			)
		).mapWith(String) as SQL<Regconfig | null>;
	};
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
 * @example
 *
 * ```
 * const generateNanoid = createGenerateNanoid({
 * 	schemaName: extensionsSchema.schemaName,
 * });
 * ```
 *
 * @param schemaName Name of the extension schema.
 * @param defaultLength The nanoid length to use by default when generating without a specified
 *   length. Lengths can be customized by passing a param to the returned `generateNanoid`
 *   function.
 * @see {@link https://github.com/iolyd/drizzle-orm-helpers/blob/main/sql/nanoid.sql Example of how to create the needed extensions and the nanoid functions} .
 */
export function createGenerateNanoid({
	schemaName,
	defaultLength = NANOID_SIZE_DEFAULT,
}: {
	schemaName?: string;
	defaultLength?: number;
} = {}) {
	const schema = schemaName ? `"${schemaName}".` : '';
	/**
	 * Generate a nanoid using postgres-nanoid.
	 *
	 * @param optimized Should the postgres extension use optimization.
	 * @param size The length of the nanoid generated. If explicit nullish is passed, will default to
	 *   the Postgres function's default size.
	 * @param alphabet The set of characters to pick randomly from. Defaults to
	 *   '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'. If explicit nullish is
	 *   passed, will default to the Postgres function's default alphabet.
	 * @see {@link /sql/nanoid.sql} for a demo of how to create the required extension and functions.
	 * @todo Stay up to date when default values will accept 'sql' without having to pass param to
	 *   sql.raw() (ref.:
	 *   https://discord.com/channels/1043890932593987624/1093946807911989369/1100459226087825571)
	 */
	return function generateNanoid({
		optimized = false,
		size = defaultLength,
		alphabet,
	}: {
		optimized?: boolean;
		size?: number;
		alphabet?: string;
	} = {}) {
		const opts: (string | number)[] = [size];
		if (alphabet) {
			opts.push(`'${alphabet}'`);
		}
		return sql
			.raw(`${schema}"nanoid${optimized ? '_optimized' : ''}"(${opts.join(',')})`)
			.mapWith(String);
	};
}

/**
 * Paginate a query.
 */
export function paginate<T extends Select>(qb: T, page: number, size: number = PAGE_SIZE_DEFAULT) {
	return qb.limit(size).offset(page * size);
}
