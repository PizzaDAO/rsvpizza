import { z } from 'zod';

export const DietaryRestrictionSchema = z.object({
	id: z.number(),
	name: z.string(),
});

export type DietaryRestriction = z.infer<typeof DietaryRestrictionSchema>;

export const DietaryRestrictionFormSchema = z.object({
	name: z
		.string()
		.nonempty({ message: 'Please enter a type of dietary restriction.' }),
});

export type DietaryRestrictionFormData = z.infer<
	typeof DietaryRestrictionFormSchema
>;
