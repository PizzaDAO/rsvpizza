import { UserFormSchema } from '~/schemas/user';
import { adminProcedure, createTRPCRouter, privateProcedure } from '../trpc';

export const usersRouter = createTRPCRouter({
	isAdmin: privateProcedure.query(async ({ ctx }) => {
		if (!ctx.emailAddresses) {
			console.log(
				'usersRouter, isAdmin function: email addresses are not defined'
			);
			return false;
		}

		const usersWithAdmin = await ctx.prisma.user.findMany({
			where: {
				email: {
					in: ctx.emailAddresses.map((email) => email.emailAddress),
				},
				role: 'ADMIN',
			},
		});

		if (!usersWithAdmin.length) {
			console.log(
				'usersRouter, isAdmin function: no matching users with admin role'
			);
			return false;
		}

		return true;
	}),

	getAll: adminProcedure.query(async ({ ctx }) => {
		const users = await ctx.prisma.user.findMany();

		return users;
	}),

	create: adminProcedure
		.input(UserFormSchema)
		.mutation(async ({ ctx, input }) => {
			const user = await ctx.prisma.user.create({
				data: {
					...input,
				},
			});

			return user;
		}),
});
