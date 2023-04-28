import { z } from 'zod';
import { TOPPING_CATEGORY } from '@prisma/client';

export const ToppingSchema = z.object({
	id: z.number(),
	name: z.string(),
	category: z
		.nativeEnum(TOPPING_CATEGORY)
		.refine((value) => Object.values(TOPPING_CATEGORY).includes(value), {
			message: 'Please enter a valid topping category.',
		}),
});

export type Topping = z.infer<typeof ToppingSchema>;

export const ToppingFormSchema = z.object({
	name: z.string().nonempty({ message: 'Please enter a topping name.' }),
	category: z
		.nativeEnum(TOPPING_CATEGORY)
		.refine((value) => Object.values(TOPPING_CATEGORY).includes(value), {
			message: 'Please enter a valid topping category.',
		}),
});

export type ToppingFormData = z.infer<typeof ToppingFormSchema>;
