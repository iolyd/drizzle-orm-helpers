import {
	SQLWrapper,
	Subquery,
	SubqueryConfig,
	Table,
	View,
	ViewBaseConfig,
	is,
	sql,
} from 'drizzle-orm';
import { PAGE_SIZE_DEFAULT, RangeBoundType, Regconfig } from './constants';
import { AnySelect, Select } from './primitives';

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
export function createRegconfig<T extends Record<string, Regconfig>>(languageTags: T) {
	const languageTagsArr = Object.keys(languageTags);
	/**
	 * Use this sql switch to retrieve an sql langauge tag statement's corresponding regconfig name.
	 */
	return function regconfig(languageTag: SQLWrapper) {
		const cases = languageTagsArr.map(
			(tag) => `when ${languageTag} = '${tag}' then '${languageTags[tag]}'::regconfig`
		);
		return `(case ${cases.join(' ')} end)`;
	};
}

/**
 * @example
 *
 * ```
 * const generateNanoid = createGenerateNanoid({
 * 	schemaName: extensionsSchema.schemaName,
 * });
 * ```
 *
 * @param schemaName Name of the extension schema.
 * @param defaultLength The nanoid length to use by default when generating without a specified
 *   length. Lengths can be customized by passing a param to the returned `generateNanoid`
 *   function.
 */
export function createGenerateNanoid({
	schemaName,
	defaultLength,
}: {
	schemaName?: string;
	defaultLength: number;
}) {
	const schema = schemaName ? `"${schemaName}".` : '';
	/**
	 * Generate a nanoid using postgres-nanoid.
	 *
	 * @param optimized Should the postgres extension use optimization.
	 * @param length The length of the nanoid generated.
	 * @param alphabet The set of characters to pick randomly from. By default, the alphabet
	 *   established when initializing and configuring the Postgres extension will be used.
	 * @see {@link /sql/nanoid.sql} for a demo of how to create the required extension and functions.
	 * @todo Stay up to date when default values will accept 'sql' without having to pass param to
	 *   sql.raw() (ref.:
	 *   https://discord.com/channels/1043890932593987624/1093946807911989369/1100459226087825571)
	 */
	return function generateNanoid({
		optimized = false,
		length = defaultLength,
		alphabet,
	}: {
		optimized?: boolean;
		/**
		 * Defaults to {NANOID_LENGTH_DEFAULT}.
		 */
		length?: number;
		/**
		 * Defaults to your extension's initialization setting.
		 */
		alphabet?: string;
	} = {}) {
		const opts: (string | number)[] = [length];
		if (alphabet) {
			opts.push(`'${alphabet}'`);
		}
		return sql.raw(`${schema}"nanoid${optimized ? '_optimized' : ''}"(${opts.join(',')})`);
	};
}

/**
 * Paginate a query.
 */
export function paginate<T extends Select>(qb: T, page: number, size: number = PAGE_SIZE_DEFAULT) {
	return qb.limit(size).offset(page * size);
}

/**
 * Type for returned value of postgres range data. While empty ranges normally return 'empty', they
 * are here modeled as [null, null] for convenience when binding range members or reprensentinf
 * their state for reactivity.
 */
export type Range = [number, number] | [null, null];

/**
 * Schema to validate and assert as range. Can also be used for the base of a custom validator with
 * the library of your choice.
 *
 * @example
 *
 * ```
 * // zod custom schema
 * const rangeSchema = z.custom<Range>(isRange);
 * ```
 *
 * @param config.min Minimum value of the range.
 * @param config.max Maximum value of the range.
 */
export function isRange(
	maybeRange: unknown,
	{
		min,
		max,
	}: {
		min?: number;
		max?: number;
		upper?: RangeBoundType;
		lower?: RangeBoundType;
	}
): maybeRange is Range {
	if (!Array.isArray(maybeRange) || maybeRange.length !== 2) {
		return false;
	}
	if (maybeRange[0] === null && maybeRange[1] === null) {
		// For convenience, 'empty' ranges are coalesced to null-bounded tuples.
		return true;
	}
	if (maybeRange[0] > maybeRange[1]) {
		// Ascending order is not respected.
		return false;
	}
	if ((min && maybeRange[0] < min) || (max && maybeRange[1] > max)) {
		// Limits are not respected.
		return false;
	}
	return true;
}
