import type { SQLChunk } from 'drizzle-orm';
import { SQL, StringChunk, sql } from 'drizzle-orm';
import { getSchemaPrefix, type ThisWithSchema } from '../../internals';

/**
 * Generate a nanoid using a postgres implementation of the nanoid function.
 *
 * @param config.optimized Should the postgres extension use optimization.
 * @param config.size The length of the nanoid generated. If explicit nullish is passed, will
 *   default to the Postgres function's default size.
 * @param config.alphabet The set of characters to pick randomly from. Defaults to
 *   '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'. If explicit nullish is
 *   passed, will default to the Postgres function's default alphabet.
 * @param config.additionalBytesFactor
 * @param config.mask
 * @param config.step
 * @see {@link https://github.com/iolyd/drizzle-orm-helpers/blob/main/sql/nanoid.sql Postgres implementation of the nanoid generator}
 */
export function nanoid(
	this: ThisWithSchema,
	{
		optimized,
		size,
		alphabet,
		additionalBytesFactor,
		mask,
		step,
	}: {
		size?: number;
		alphabet?: string;
	} & (
		| {
				optimized?: false;
				additionalBytesFactor?: number;
				mask?: never;
				step?: never;
		  }
		| {
				optimized: true;
				additionalBytesFactor?: never;
				mask?: number;
				step?: number;
		  }
	) = {}
) {
	const chunks: SQLChunk[] = [];
	if (size) {
		chunks.push(sql`size => ${size}`);
	}
	if (alphabet) {
		chunks.push(sql`alphabet => ${alphabet}`);
	}
	if (additionalBytesFactor) {
		chunks.push(sql`additionalBytesFactor => ${additionalBytesFactor}`);
	}
	if (mask) {
		chunks.push(sql`mask => ${mask}`);
	}
	if (step) {
		chunks.push(sql`step => ${step}`);
	}
	const fn = optimized ? 'nanoid_optimized' : 'nanoid';
	return new SQL([
		new StringChunk(`${getSchemaPrefix.call(this)}${fn}(`),
		sql.join(chunks, new StringChunk(', ')),
		new StringChunk(')'),
	]).mapWith(String);
}
