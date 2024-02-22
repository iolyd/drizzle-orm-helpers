import { MySqlDialect } from 'drizzle-orm/mysql-core';
import { PgDialect } from 'drizzle-orm/pg-core';

export const MYSQL_DIALECT = new MySqlDialect();

export const PG_DIALECT = new PgDialect();

export type NonUndefinable<T> = T extends undefined ? never : T;
