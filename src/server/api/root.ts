import { createTRPCRouter } from '~/server/api/trpc';
import {
	dietaryRestrictionsRouter,
	eventsRouter,
	ordersRouter,
	toppingsRouter,
	usersRouter,
} from './routers';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	users: usersRouter,
	events: eventsRouter,
	orders: ordersRouter,
	dietaryRestrictions: dietaryRestrictionsRouter,
	toppings: toppingsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
