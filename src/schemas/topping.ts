import { z } from 'zod';

export const ToppingSchema = z.object({
	id: z.number(),
	name: z.string(),
});

export type Topping = z.infer<typeof ToppingSchema>;

export const ToppingFormSchema = z.object({
	name: z.string().nonempty({ message: 'Please enter a topping name.' }),
});

export type ToppingFormData = z.infer<typeof ToppingFormSchema>;
