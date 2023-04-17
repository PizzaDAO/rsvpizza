import { DietaryRestrictionFormSchema } from '~/schemas/dietaryRestriction';
import {
	adminProcedure,
	createTRPCRouter,
	publicProcedure,
} from '~/server/api/trpc';

export const dietaryRestrictionsRouter = createTRPCRouter({
	getAll: publicProcedure.query(async ({ ctx }) => {
		const dietaryRestrictions = await ctx.prisma.dietaryRestriction.findMany();

		return dietaryRestrictions;
	}),

	create: adminProcedure
		.input(DietaryRestrictionFormSchema)
		.mutation(async ({ ctx, input }) => {
			const dietaryRestriction = await ctx.prisma.dietaryRestriction.create({
				data: {
					...input,
				},
			});

			return dietaryRestriction;
		}),
});
