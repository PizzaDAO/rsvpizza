import { nanoid } from 'nanoid';
import { z } from 'zod';
import { EventFormSchema, EventSchema } from '~/schemas/event';
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
				userId: {
					equals: ctx.userId!,
				},
			},
			orderBy: {
				datetime: 'asc',
			},
		});

		const validatedEvents = events.map((event) => EventSchema.parse(event));

		return validatedEvents;
	}),

	getBySlug: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
		const event = await ctx.prisma.event.findUnique({
			where: {
				slug: input,
			},
		});

		if (!event) {
			// TODO: Should this be a 404? Or is there a better error I can throw?
			throw new Error(`Event with slug '${input}' not found`);
		}

		const validatedEvent = EventSchema.parse(event);
		return validatedEvent;
	}),

	create: privateProcedure
		.input(EventFormSchema)
		.mutation(async ({ ctx, input }) => {
			let slug: string;
			let isUnique = false;

			// ensure slug is unique before creating event
			while (!isUnique) {
				slug = nanoid();
				const existingEvent = await ctx.prisma.event.findUnique({
					where: { slug },
				});
				isUnique = existingEvent === null;
			}

			const event = await ctx.prisma.event.create({
				data: {
					userId: ctx.userId,
					name: input.name,
					description: input.description,
					datetime: input.datetime,
					location: input.location,
					attendees: input.attendees,
					slug: slug!,
				},
			});

			return event;
		}),
});
