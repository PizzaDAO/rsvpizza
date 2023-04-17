import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { z } from 'zod';
import { OrderFormSchema } from '~/schemas/order';

export const ordersRouter = createTRPCRouter({
	getAllByEvent: publicProcedure
		.input(z.string())
		.query(async ({ ctx, input }) => {
			const orders = await ctx.prisma.order.findMany({
				where: {
					eventId: {
						equals: input,
					},
				},
			});

			return orders;
		}),

	create: publicProcedure
		.input(OrderFormSchema)
		.mutation(async ({ ctx, input }) => {
			const order = await ctx.prisma.order.create({
				data: {
					...input,
				},
			});

			return order;
		}),
});
