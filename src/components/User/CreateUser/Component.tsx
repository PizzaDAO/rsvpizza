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
import { UserFormData, UserFormSchema } from '~/schemas';
import { api } from '~/utils/api';

export const CreateUser: FC = () => {
	const { mutate } = api.users.create.useMutation();

	const handleFormSubmit = (data: UserFormData) => {
		mutate(data);
	};

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<UserFormData>({
		resolver: zodResolver(UserFormSchema),
	});

	const toast = useToast();

	const onFormSubmit = async (data: UserFormData) => {
		toast({
			title: 'User created.',
			description: 'The user has been successfully created.',
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
				<FormControl isInvalid={!!errors.email}>
					<FormLabel htmlFor='email'>User Email</FormLabel>
					<Input
						id='email'
						{...register('email')}
						bg={'white'}
						color={'black'}
					/>
					<FormErrorMessage>{errors.email?.message}</FormErrorMessage>
				</FormControl>
				<FormControl isInvalid={!!errors.role}>
					<FormLabel htmlFor='role'>Role</FormLabel>
					<Select id='role' {...register('role')} bg={'white'} color={'black'}>
						<option value='USER'>USER</option>
						<option value='ADMIN'>ADMIN</option>
					</Select>
					<FormErrorMessage>{errors.role?.message}</FormErrorMessage>
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
					Create User
				</Button>
			</VStack>
		</Box>
	);
};

export default CreateUser;
