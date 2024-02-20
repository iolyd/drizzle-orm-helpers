import { z } from 'zod';

export function intrangeSchema({
	min,
	max,
}: {
	min?: number;
	max?: number;
} = {}) {
	const baseSchema = z.number().int();
	const lowerSchema = (min ? baseSchema.min(min) : baseSchema).nullable();
	const upperSchema = (max ? baseSchema.max(max) : baseSchema).nullable();
	return z.object({
		lower: lowerSchema,
		upper: upperSchema,
	});
}

export function numrangeSchema({
	min,
	max,
}: {
	min?: number;
	max?: number;
} = {}) {
	const lowerSchema = (min ? z.number().min(min) : z.number()).nullable();
	const upperSchema = (max ? z.number().max(max) : z.number()).nullable();
	return z.object({
		lower: lowerSchema,
		upper: upperSchema,
	});
}

function dateToString(date: Date, withTimezone?: boolean) {
	if (withTimezone) {
		return date.toISOString();
	}
	const tzOffset = date.getTimezoneOffset() * 6_000;
	return new Date(date.valueOf() - tzOffset).toISOString().slice(0, -1);
}

/**
 * Because of typescript's peculiar handling of Inifinity/-Infinity, ranges without limit need to
 * consider number members that indicate infinite bounds.
 */
export function tsrangeSchema<
	TMode extends 'date' | 'string',
	TData = TMode extends 'string' ? string : Date | number,
>({
	min,
	max,
	withTimezone,
	mode,
}: {
	min?: Date;
	max?: Date;
	withTimezone?: boolean;
	mode?: TMode;
} = {}) {
	const baseSchema = z.date({ coerce: mode === 'string' });
	const infinitySchema = z.number({ coerce: mode === 'string' });
	function toMode(d: number | Date | null): TData {
		if (mode === 'string' && d !== null) {
			if (d instanceof Date) {
				return dateToString(d, withTimezone) as TData;
			}
			if (d === -Infinity) {
				return '-infinity' as TData;
			}
			if (d === Infinity) {
				return 'infinity' as TData;
			}
			return d.toString() as TData;
		}
		return d as TData;
	}
	const lowerSchema = (min ? baseSchema.min(min) : baseSchema.or(infinitySchema))
		.nullable()
		.transform(toMode);
	const upperSchema = (max ? baseSchema.max(max) : baseSchema.or(infinitySchema))
		.nullable()
		.transform(toMode);
	return z.object({
		lower: lowerSchema,
		upper: upperSchema,
	});
}

export function daterangeSchema<
	TMode extends 'string' | 'date',
	TData = TMode extends 'string' ? string : Date | number,
>({
	min,
	max,
	mode,
}: {
	min?: Date;
	max?: Date;
	mode?: TMode;
} = {}) {
	const baseSchema = z.date({ coerce: mode === 'string' });
	const infinitySchema = z.number({ coerce: mode === 'string' });
	function toMode(d: number | Date | null): TData {
		if (mode === 'string' && d !== null) {
			if (d instanceof Date) {
				return dateToString(d) as TData;
			}
			if (d === -Infinity) {
				return '-infinity' as TData;
			}
			if (d === Infinity) {
				return 'infinity' as TData;
			}
			return d.toString() as TData;
		}
		return d as TData;
	}
	const lowerSchema = (min ? baseSchema.min(min) : baseSchema.or(infinitySchema))
		.nullable()
		.transform(toMode);
	const upperSchema = (max ? baseSchema.max(max) : baseSchema.or(infinitySchema))
		.nullable()
		.transform(toMode);
	return z.object({
		lower: lowerSchema,
		upper: upperSchema,
	});
}
