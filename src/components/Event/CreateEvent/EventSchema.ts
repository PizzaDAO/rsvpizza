import { z } from 'zod';

const dateStringSchema = z.string().refine(
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

const datetimeSchema = dateStringSchema.transform((value) => new Date(value));

export const EventFormSchema = z.object({
	name: z.string().nonempty({ message: 'Please enter an event name.' }),
	datetime: datetimeSchema,
	location: z.string().nonempty({ message: 'Please enter a location.' }),
	attendees: z
		.string()
		.refine(
			(value) => {
				try {
					const num = Number(value);
					return !isNaN(num) && num > 0;
				} catch {
					return false;
				}
			},
			{
				message: 'Attendees must be a number greater than zero.',
			}
		)
		.transform((value) => Number(value)),
	description: z
		.string()
		.nonempty({ message: 'Please enter a description.' })
		.max(255, 'Description must be a maximum of 255 characters'),
});

export type EventFormData = z.infer<typeof EventFormSchema>;
