import { z } from 'zod';

export const EventSchema = z.object({
	id: z.string(),
	userId: z.string(),
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
	datetime: z.date(),
	location: z.string().nonempty({ message: 'Please enter a location.' }),
	attendees: z.number().min(1, 'Please enter a number greater than 0.'),
	description: z
		.string()
		.nonempty({ message: 'Please enter a description.' })
		.max(255, 'Description must be a maximum of 255 characters'),
});

export type EventFormData = z.infer<typeof EventFormSchema>;
