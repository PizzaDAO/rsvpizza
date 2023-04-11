import { z } from 'zod';

export const datetimeStringSchema = z.string().refine(
	(value) => {
		try {
			new Date(value);
			return true;
		} catch {
			return false;
		}
	},
	{
		message: 'Invalid date format',
	}
);

export const datetimeSchema = datetimeStringSchema.transform(
	(value) => new Date(value)
);
