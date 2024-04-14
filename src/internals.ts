import { PgDialect } from 'drizzle-orm/pg-core';

export const PG_DIALECT = new PgDialect();

export type NonUndefinable<T> = T extends undefined ? never : T;
