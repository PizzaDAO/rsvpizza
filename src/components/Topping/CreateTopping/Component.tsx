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
	Select,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToppingFormData, ToppingFormSchema } from '~/schemas';
import { api } from '~/utils/api';

export const CreateTopping: FC = () => {
	const ctx = api.useContext();

	const { mutate } = api.toppings.create.useMutation({
		onSuccess: () => {
			ctx.toppings.getAll.invalidate();
		},
	});

	const handleFormSubmit = (data: ToppingFormData) => {
		mutate(data);
	};

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<ToppingFormData>({
		resolver: zodResolver(ToppingFormSchema),
	});

	const toast = useToast();

	const onFormSubmit = async (data: any) => {
		toast({
			title: 'Topping created.',
			description: 'The topping has been successfully created.',
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
					<FormLabel htmlFor='name'>Topping Name</FormLabel>
					<Input id='name' {...register('name')} />
					<FormErrorMessage>{errors.name?.message}</FormErrorMessage>
				</FormControl>
				<FormControl isInvalid={!!errors.category}>
					<FormLabel htmlFor='category'>Topping Category</FormLabel>
					<Select
						id='category'
						{...register('category')}
						bg={'white'}
						color={'black'}
					>
						<option value='MEAT'>Meat</option>
						<option value='NON_MEAT'>Non-Meat</option>
					</Select>
					<FormErrorMessage>{errors.category?.message}</FormErrorMessage>
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
					Create Topping
				</Button>
			</VStack>
		</Box>
	);
};

export default CreateTopping;
