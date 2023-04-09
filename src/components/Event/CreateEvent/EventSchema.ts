import { z } from 'zod';

export const EventFormSchema = z.object({
	name: z.string().min(1, 'Event name is required'),
	datetime: z.date(),
	location: z.string().min(1, 'Location is required'),
	attendees: z.number().min(1, 'Number of attendees must be at least 1'),
	description: z
		.string()
		.max(255, 'Description must be a maximum of 255 characters'),
});

export type EventFormData = z.infer<typeof EventFormSchema>;
