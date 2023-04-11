import type { User } from '@clerk/nextjs/dist/api';
import { clerkClient } from '@clerk/nextjs/server';
import { z } from 'zod';
import { EventSchema } from '~/schemas/event';

import {
	createTRPCRouter,
	privateProcedure,
	publicProcedure,
} from '~/server/api/trpc';

export const eventsRouter = createTRPCRouter({
	getAll: privateProcedure.query(async ({ ctx }) => {
		const events = await ctx.prisma.event.findMany({
			take: 100,
			where: {
				creatorId: {
					equals: ctx.userId!,
				},
			},
		});

		const validatedEvents = events.map((event) => EventSchema.parse(event));

		return validatedEvents;
	}),

	create: privateProcedure
		.input(
			z.object({
				name: z.string().min(1, 'Event name is required'),
				datetime: z.date(),
				location: z.string().min(1, 'Location is required'),
				attendees: z.number().min(1, 'Number of attendees must be at least 1'),
				slug: z.string().max(200, 'Slug must be a maximum of 255 characters'),
				description: z
					.string()
					.max(255, 'Description must be a maximum of 255 characters'),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const creatorId = ctx.userId;

			const event = await ctx.prisma.event.create({
				data: {
					creatorId,
					name: input.name,
					description: input.description,
					datetime: input.datetime,
					location: input.location,
					attendees: input.attendees,
					slug: input.slug,
				},
			});

			return event;
		}),
});
