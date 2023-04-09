import type { User } from '@clerk/nextjs/dist/api';
import { clerkClient } from '@clerk/nextjs/server';
import { z } from 'zod';

import {
	createTRPCRouter,
	privateProcedure,
	publicProcedure,
} from '~/server/api/trpc';

const filterUserForClient = (user: User) => {
	return {
		id: user.id,
		username: user.username,
		profileImageUrl: user.profileImageUrl,
	};
};

export const eventsRouter = createTRPCRouter({
	getAll: publicProcedure.query(async ({ ctx }) => {
		const events = await ctx.prisma.event.findMany({
			take: 100,
			where: {
				creatorId: {
					equals: ctx.userId!,
				},
			},
		});

		const users = (
			await clerkClient.users.getUserList({
				userId: events.map((event) => event.creatorId),
				limit: 100,
			})
		).map(filterUserForClient);

		return events;
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
					date: input.datetime,
					location: input.location,
					attendees: input.attendees,
					slug: input.slug,
				},
			});

			return event;
		}),
	/*getOne: publicProcedure.query(({ ctx, input }) => {
		return ctx.prisma.event.findUnique({
			where: {
				id: input.id,
			},
		});
	}),
	create: publicProcedure.mutation({
    input: z.object({
      name: z.string(),
      description: z.string(),
      date: z.string(),
      time: z.string(),
      location: z.string(),
      image: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      return ctx.prisma.event.create({
        data: {
          name: input.name,
          description: input.description,
          date: input.date,
          time: input.time,
          location: input.location,
          image: input.image,
        },
      });
    }
  }),

  update: publicProcedure.mutation({
    input: z.object({
      id: z.number(),
      name: z.string(),
      description: z.string(),
      date: z.string(),
      time: z.string(),
      location: z.string(),
      image: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      return ctx.prisma.event.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          description: input.description,
          date: input.date,
          time: input.time,
          location: input.location,
          image: input.image,
        },
      });
    }
  }),

  delete: publicProcedure.mutation({
    input: z.object({
      id: z.number(),
    }),
    resolve: async ({ ctx, input }) => {
      return ctx.prisma.event.delete({
        where: {
          id: input.id,
        },
      });
    }
  }), */
});
