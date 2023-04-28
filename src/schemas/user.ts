import { z } from 'zod';
import { ROLE } from '@prisma/client';

export const UserSchema = z.object({
	id: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
	email: z.string(),
	role: z
		.nativeEnum(ROLE)
		.refine((value) => Object.values(ROLE).includes(value), {
			message: 'Please enter a valid role.',
		}),
});

export type User = z.infer<typeof UserSchema>;

export const UserFormSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email address.' }),
	role: z
		.nativeEnum(ROLE)
		.refine((value) => Object.values(ROLE).includes(value), {
			message: 'Please enter a valid role.',
		}),
});

export type UserFormData = z.infer<typeof UserFormSchema>;
