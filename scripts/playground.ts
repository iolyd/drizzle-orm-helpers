import { PgDialect, pgSchema, pgTable, text } from 'drizzle-orm/pg-core';
import { withSchema } from '../src';
import { nanoid as _nanoid } from '../src/pg';

console.log('Start');
const dialect = new PgDialect();
const schema = pgSchema('extensions');
const nanoid = withSchema(_nanoid, schema);
// console.log(dialect.sqlToQuery(nanoid()).sql);
const table = pgTable('table', {
	id: text('id').default(nanoid()),
});
// console.log(table);
console.log('End');
