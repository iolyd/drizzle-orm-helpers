import type {
	AnyColumn,
	Column,
	ColumnBuilderBase,
	ColumnsSelection,
	InferSelectModel,
	Param,
	SQLWrapper,
	WithSubquery,
} from 'drizzle-orm';
import { SQL, Subquery, SubqueryConfig, Table, View, ViewBaseConfig, is } from 'drizzle-orm';
import type {
	AnyMySqlSelect,
	MySqlSchema,
	MySqlSelect,
	SubqueryWithSelection as MySqlSubqueryWithSelection,
	WithSubqueryWithSelection as MySqlWithSubqueryWithSelection,
} from 'drizzle-orm/mysql-core';
import type {
	AnyPgSelect,
	PgSchema,
	PgSelect,
	SubqueryWithSelection as PgSubqueryWithSelection,
	WithSubqueryWithSelection as PgWithSubqueryWithSelection,
} from 'drizzle-orm/pg-core';
import type {
	AnySQLiteSelect,
	SQLiteSelect,
	SubqueryWithSelection as SQLiteSubqueryWithSelection,
	WithSubqueryWithSelection as SQLiteWithSubqueryWithSelection,
} from 'drizzle-orm/sqlite-core';
import type { SetOptional } from 'type-fest';

/**
 * Dialect agnostic select.
 *
 * @see PgSelect.
 * @see MySqlSelect
 * @see SQLiteSelect
 */
export type Select = SetOptional<PgSelect | MySqlSelect | SQLiteSelect, 'where'>;

/**
 * Dialect-agnostic schema. Excludes SQLite.
 */
export type Schema = PgSchema | MySqlSchema;

/**
 * Dialect-agnostic subquery with selection.
 */
export type SubqueryWithSelection<TSelection extends ColumnsSelection, TName extends string> =
	| MySqlSubqueryWithSelection<TSelection, TName>
	| PgSubqueryWithSelection<TSelection, TName>
	| SQLiteSubqueryWithSelection<TSelection, TName>;

/**
 * Dialect-agnostic with subquery with selection.
 */
export type WithSubqueryWithSelection<TSelection extends ColumnsSelection, TAlias extends string> =
	| PgWithSubqueryWithSelection<TSelection, TAlias>
	| SQLiteWithSubqueryWithSelection<TSelection, TAlias>
	| MySqlWithSubqueryWithSelection<TSelection, TAlias>;

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
 * Infer any SQL wrapper's expected return data type.
 */
export type InferDataType<T extends SQLWrapper> = T extends Table
	? InferSelectModel<T>
	: T extends Column
		? T['_']['notNull'] extends true
			? T['_']['dataType']
			: T['_']['dataType'] | null
		: T extends View | Subquery
			? T['_']['selectedFields']
			: T extends SQL<infer U>
				? U
				: T extends SQL.Aliased<infer U>
					? U
					: T extends Param
						? T['value']
						: unknown;

/**
 * Infer table columns or (sub)query fields.
 */
export type InferColumns<
	T extends
		| Table
		| View
		| SubqueryWithSelection<ColumnsSelection, string>
		| WithSubqueryWithSelection<ColumnsSelection, string>
		| AnySelect,
> = T extends Table
	? T['_']['columns']
	: T extends
				| View
				| SubqueryWithSelection<ColumnsSelection, string>
				| WithSubqueryWithSelection<ColumnsSelection, string>
				| AnySelect
		? T['_']['selectedFields']
		: never;

/**
 * Infer a table's name or a (sub)query's alias.
 */
export type InferNameOrAlias<
	T extends Table | View | Subquery | WithSubquery | AnySelect | SQL.Aliased,
> = T extends Table | View
	? T['_']['name']
	: T extends Subquery | WithSubquery
		? T['_']['alias']
		: T extends AnySelect
			? T['_']['tableName']
			: T extends SQL.Aliased
				? T['fieldAlias']
				: never;

/**
 * Should replace `getTableColumns` to allow for more input versatility.
 *
 * @see https://github.com/drizzle-team/drizzle-orm/pull/1789
 */
export function getColumns<
	T extends
		| Table
		| View
		| SubqueryWithSelection<ColumnsSelection, string>
		| WithSubqueryWithSelection<ColumnsSelection, string>
		| AnySelect,
>(table: T): InferColumns<T> {
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

/**
 * Get a table's name or a (sub)query's alias.
 */
export function getNameOrAlias<
	T extends Table | View | Subquery | WithSubquery | AnySelect | SQL.Aliased,
>(table: T): InferNameOrAlias<T> {
	return is(table, Table)
		? // eslint-disable-next-line @typescript-eslint/no-explicit-any
			(table as any)[(Table as any).Symbol.Name]
		: is(table, View)
			? // eslint-disable-next-line @typescript-eslint/no-explicit-any
				(table as any)[ViewBaseConfig].name
			: is(table, Subquery)
				? // eslint-disable-next-line @typescript-eslint/no-explicit-any
					(table as any)[SubqueryConfig].alias
				: is(table, SQL.Aliased)
					? table.fieldAlias
					: // eslint-disable-next-line @typescript-eslint/no-explicit-any
						(table as any).tableName;
}

/**
 * Paginate a query.
 */
export function paginate<T extends Select>(qb: T, page: number, size: number = 20) {
	return qb.limit(size).offset(page * size);
}
