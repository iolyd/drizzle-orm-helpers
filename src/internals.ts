import { MySqlDialect } from 'drizzle-orm/mysql-core';
import { PgDialect } from 'drizzle-orm/pg-core';
import type { Schema } from '.';

export const MYSQL_DIALECT = new MySqlDialect();

export const PG_DIALECT = new PgDialect();

export const SCHEMA_SYMBOL = Symbol('schema');

export type ThisWithSchema = { [SCHEMA_SYMBOL]: Schema | string } | void;

export function getSchemaName<T extends Schema | string>(schema: T) {
	return (typeof schema === 'string' ? schema : schema.schemaName) as T extends Schema
		? T['schemaName']
		: T;
}

export function getSchemaPrefix(this: ThisWithSchema) {
	if (!this?.[SCHEMA_SYMBOL]) {
		return '';
	}
	return `${getSchemaName(this[SCHEMA_SYMBOL])}.`;
}
