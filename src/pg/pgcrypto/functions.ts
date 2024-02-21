import { sql } from 'drizzle-orm';

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
 * @see https://discord.com/channels/1043890932593987624/1093946807911989369/1100459226087825571
 * @todo Stay up to date when default values will accept 'sql' without having to pass param to
 *   sql.raw()
 */
export function nanoid({
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
) = {}) {
	const params: string[] = [];
	if (size) {
		params.push(`size => ${size}`);
	}
	if (alphabet) {
		params.push(`alphabet => '${alphabet}'`);
	}
	if (additionalBytesFactor) {
		params.push(`additionalBytesFactor => ${additionalBytesFactor}`);
	}
	if (mask) {
		params.push(`mask => ${mask}`);
	}
	if (step) {
		params.push(`step => ${step}`);
	}
	const fname = optimized ? 'nanoid_optimized' : 'nanoid';
	// return new SQL([
	// 	new StringChunk(`${getSchemaPrefix.call(this)}${fname}(`),
	// 	sql.join(chunks, new StringChunk(', ')),
	// 	new StringChunk(')'),
	// ]).mapWith(String);
	return sql.raw(`${fname}(${params.join(',')})`).mapWith(String);
}
