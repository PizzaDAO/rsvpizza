import { z } from 'zod';
import { datetimeSchema } from './utils';

export const EventSchema = z.object({
	id: z.string(),
	creatorId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
	name: z.string(),
	datetime: z.date(),
	location: z.string(),
	slug: z.string(),
	attendees: z.number(),
	description: z.string(),
});

export type Event = z.infer<typeof EventSchema>;

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
