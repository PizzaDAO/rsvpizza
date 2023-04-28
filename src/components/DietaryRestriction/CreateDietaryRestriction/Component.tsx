import React, { FC } from 'react';
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	VStack,
	useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	DietaryRestrictionFormData,
	DietaryRestrictionFormSchema,
} from '~/schemas';
import { api } from '~/utils/api';

export const CreateDietaryRestriction: FC = () => {
	const ctx = api.useContext();

	const { mutate } = api.dietaryRestrictions.create.useMutation({
		onSuccess: () => {
			ctx.dietaryRestrictions.getAll.invalidate();
		},
	});

	const handleFormSubmit = (data: DietaryRestrictionFormData) => {
		mutate(data);
	};

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<DietaryRestrictionFormData>({
		resolver: zodResolver(DietaryRestrictionFormSchema),
	});

	const toast = useToast();

	const onFormSubmit = async (data: any) => {
		toast({
			title: 'Dietary Restriction created.',
			description: 'The dietary restriction has been successfully created.',
			status: 'success',
			duration: 5000,
			isClosable: true,
		});

		handleFormSubmit(data);
		reset();
	};

	return (
		<Box as='form' onSubmit={handleSubmit(onFormSubmit)}>
			<VStack spacing={4}>
				<FormControl isInvalid={!!errors.name}>
					<FormLabel htmlFor='name'>Dietary Restriction Name</FormLabel>
					<Input id='name' {...register('name')} />
					<FormErrorMessage>{errors.name?.message}</FormErrorMessage>
				</FormControl>
				<Button
					width='100%'
					type='submit'
					isLoading={isSubmitting}
					loadingText='Submitting'
					bg='gray.700'
					color='white'
					_hover={{ bg: 'gray.600' }}
					_active={{ bg: 'gray.800' }}
				>
					Create Dietary Restriction
				</Button>
			</VStack>
		</Box>
	);
};
