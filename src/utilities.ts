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
import { PAGE_SIZE_DEFAULT, Regconfig } from './constants';
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
 * Paginate a query.
 */
export function paginate<T extends Select>(qb: T, page: number, size: number = PAGE_SIZE_DEFAULT) {
	return qb.limit(size).offset(page * size);
}
