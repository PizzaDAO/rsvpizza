import { z } from 'zod';
import { ToppingSchema } from './topping';
import { DietaryRestrictionSchema } from './dietaryRestriction';

export const OrderSchema = z.object({
	id: z.string(),
	eventId: z.string(),
	userId: z.string().optional(),
	name: z.string().optional(),
	createdAt: z.date(),
	updatedAt: z.date(),
	dietaryRestrictions: z.array(DietaryRestrictionSchema),
	toppings: z.array(ToppingSchema),
	sliceQuantity: z.number(),
});

export type Order = z.infer<typeof OrderSchema>;

export const OrderFormSchema = z.object({
	eventId: z.string(),
	name: z.string().optional(),
	userId: z.string().optional(),
	dietaryRestrictions: z.array(DietaryRestrictionSchema),
	toppings: z.array(ToppingSchema),
	sliceQuantity: z.number().min(1, { message: 'Please enter a quantity.' }),
});

export type OrderFormData = z.infer<typeof OrderFormSchema>;
