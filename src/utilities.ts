import type {
	AnyColumn,
	Column,
	ColumnBuilderBase,
	InferSelectModel,
	Param,
	SQL,
	SQLWrapper,
} from 'drizzle-orm';
import { Subquery, SubqueryConfig, Table, View, ViewBaseConfig, is } from 'drizzle-orm';
import type { AnyMySqlSelect, MySqlSchema, MySqlSelect } from 'drizzle-orm/mysql-core';
import type { AnyPgSelect, PgSchema, PgSelect } from 'drizzle-orm/pg-core';
import type { AnySQLiteSelect, SQLiteSelect } from 'drizzle-orm/sqlite-core';
import type { SetOptional } from 'type-fest';
import type { ThisWithSchema } from './internals';
import { SCHEMA_SYMBOL } from './internals';

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
 * Paginate a query.
 */
export function paginate<T extends Select>(qb: T, page: number, size: number = 20) {
	return qb.limit(size).offset(page * size);
}

/**
 * Indicate if a custom type, a function, or a value belongs to a schema, ex. a different extensions
 * schema.
 *
 * @param ressource The column type, function, or etc. for which to specify the schema where the
 *   related extension was created in your database.
 * @param scehma The Drizzle-ORM schema or the schema name.
 * @returns The ressource with bound to the specified schema.
 */
export function withSchema<
	A extends unknown[] | never,
	T extends ColumnBuilderBase | SQLWrapper,
	S extends Schema | string,
>(ressource: (this: ThisWithSchema, ...args: A) => T, schema: S) {
	return ressource.bind({ [SCHEMA_SYMBOL]: schema });
}
