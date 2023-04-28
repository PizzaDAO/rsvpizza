import { ToppingFormSchema } from '~/schemas/topping';
import { adminProcedure, createTRPCRouter, publicProcedure } from '../trpc';

export const toppingsRouter = createTRPCRouter({
	getAll: publicProcedure.query(async ({ ctx }) => {
		const toppings = await ctx.prisma.topping.findMany();

		return toppings;
	}),

	create: adminProcedure
		.input(ToppingFormSchema)
		.mutation(async ({ ctx, input }) => {
			const topping = await ctx.prisma.topping.create({
				data: {
					...input,
				},
			});

			return topping;
		}),
});
