import { PgDialect, pgSchema } from 'drizzle-orm/pg-core';
import { withSchema } from '../src';
import { nanoid as _nanoid } from '../src/pg';

console.log('Start');
const dialect = new PgDialect();
const schema = pgSchema('extensions');
const nanoid = withSchema(_nanoid, schema);
console.log(dialect.sqlToQuery(nanoid()).sql);
console.log('End');
