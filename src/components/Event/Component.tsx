import { Flex, Text } from '@chakra-ui/react';
import { useUser } from '@clerk/nextjs';
// components/EventForm.tsx
import { useState } from 'react';
import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Textarea,
	VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface EventFormProps {
	onSubmit: (data: EventFormData) => void;
}

// schemas/EventFormSchema.ts
import { z } from 'zod';

export const EventFormSchema = z.object({
	name: z.string().min(1, 'Event name is required'),
	datetime: z.date(),
	location: z.string().min(1, 'Location is required'),
	numberOfAttendees: z
		.number()
		.min(1, 'Number of attendees must be at least 1'),
	description: z
		.string()
		.max(255, 'Description must be a maximum of 255 characters'),
});

export type EventFormData = z.infer<typeof EventFormSchema>;

export const CreateEventWizard: React.FC<EventFormProps> = ({ onSubmit }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<EventFormData>({
		resolver: zodResolver(EventFormSchema),
	});
	const { user } = useUser();

	if (!user) {
		return null;
	}

	return (
		<Flex
			position={'relative'}
			flexDirection={'row'}
			justifyContent={'flex-start'}
			bgColor={'red.500'}
			w={'500px'}
		>
			<img
				src={user.profileImageUrl}
				alt={'Profile image'}
				width={'128px'}
				height={'128px'}
			/>
			<Box as='form' onSubmit={handleSubmit(onSubmit)}>
				<VStack spacing={4}>
					<FormControl isInvalid={!!errors.name}>
						<FormLabel htmlFor='name'>Event Name</FormLabel>
						<Input id='name' {...register('name')} />
						<FormErrorMessage>{errors.name?.message}</FormErrorMessage>
					</FormControl>

					<FormControl isInvalid={!!errors.datetime}>
						<FormLabel htmlFor='datetime'>Date and Time</FormLabel>
						<Input
							type='datetime-local'
							id='datetime'
							{...register('datetime')}
						/>
						<FormErrorMessage>{errors.datetime?.message}</FormErrorMessage>
					</FormControl>

					<FormControl isInvalid={!!errors.location}>
						<FormLabel htmlFor='location'>Location</FormLabel>
						<Input id='location' {...register('location')} />
						<FormErrorMessage>{errors.location?.message}</FormErrorMessage>
					</FormControl>

					<FormControl isInvalid={!!errors.numberOfAttendees}>
						<FormLabel htmlFor='numberOfAttendees'>
							Number of Attendees
						</FormLabel>
						<Input
							type='number'
							id='numberOfAttendees'
							{...register('numberOfAttendees')}
						/>
						<FormErrorMessage>
							{errors.numberOfAttendees?.message}
						</FormErrorMessage>
					</FormControl>

					<FormControl isInvalid={!!errors.description}>
						<FormLabel htmlFor='description'>Description</FormLabel>
						<Textarea id='description' {...register('description')} />
						<FormErrorMessage>{errors.description?.message}</FormErrorMessage>
					</FormControl>

					<Button type='submit' colorScheme='teal'>
						Submit
					</Button>
				</VStack>
			</Box>
		</Flex>
	);
};
