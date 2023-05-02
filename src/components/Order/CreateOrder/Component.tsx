import { FC } from 'react';
import {
	Box,
	Button,
	Checkbox,
	CheckboxGroup,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	VStack,
	useToast,
} from '@chakra-ui/react';
import { OrderFormData, OrderFormSchema } from '~/schemas/order';
import { api } from '~/utils/api';
import { DietaryRestriction, Topping } from '@prisma/client';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@clerk/nextjs';

interface CreateOrderProps {
	eventId: string;
	toppings: Topping[] | undefined;
	dietaryRestrictions: DietaryRestriction[] | undefined;
}

export const CreateOrder: FC<CreateOrderProps> = ({
	eventId,
	toppings,
	dietaryRestrictions,
}) => {
	// stuff related to the api
	const { userId } = useAuth();
	const toast = useToast();
	const ctx = api.useContext();

	const { mutate } = api.orders.create.useMutation({
		onSuccess: () => {
			ctx.orders.getAllByEvent.invalidate(eventId);
		},
	});

	// stuff related to the form
	const {
		register,
		handleSubmit,
		control,
		getValues,
		setValue,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<OrderFormData>({
		defaultValues: {
			eventId: '',
			name: '',
			userId: '',
			dietaryRestrictionIds: [],
			toppingIds: [],
			sliceQuantity: 1,
		},
		resolver: zodResolver(OrderFormSchema),
	});

	const onSubmit = (data: OrderFormData) => {
		const { name, toppingIds, dietaryRestrictionIds, sliceQuantity } = data;
		mutate({
			eventId,
			name,
			toppingIds: toppingIds.map(Number),
			dietaryRestrictionIds: dietaryRestrictionIds.map(Number),
			sliceQuantity,
			userId: userId ?? undefined,
		});

		toast({
			title: 'Order created',
			description: 'Your order has been created.',
			status: 'success',
			duration: 5000,
			isClosable: true,
		});

		reset();
	};

	console.log('errors', errors);
	return (
		<Box
			width={'1000px'}
			bg={'#181726'}
			as='form'
			onSubmit={handleSubmit(onSubmit)}
		>
			<VStack spacing={4} alignItems='stretch'>
				<FormControl id='name' isInvalid={!!errors.name}>
					<FormLabel>Name (optional)</FormLabel>
					<Input
						{...register('name', {
							required: { value: false, message: 'something something' },
						})}
						placeholder='Name'
						variant='filled'
					/>
					<FormErrorMessage>{errors.name?.message}</FormErrorMessage>
				</FormControl>
				<FormControl>
					<FormLabel>Toppings</FormLabel>
					<Controller
						name={'toppingIds'}
						control={control}
						render={({ field: { onChange, ...rest } }) => (
							<CheckboxGroup
								defaultValue={[]}
								onChange={(val) => {
									onChange(val.map((v) => Number(v)));
								}}
								{...rest}
							>
								<Flex flexWrap='wrap'>
									{toppings &&
										toppings.map((topping) => (
											<Checkbox
												value={topping.id}
												key={topping.id}
												isChecked={getValues().toppingIds.includes(topping.id)}
												padding={'5px'}
											>
												{topping.name}
											</Checkbox>
										))}
								</Flex>
							</CheckboxGroup>
						)}
					/>
					<FormErrorMessage>{errors.toppingIds?.message}</FormErrorMessage>
				</FormControl>
				<FormControl>
					<FormLabel>Toppings</FormLabel>
					<Controller
						name={'dietaryRestrictionIds'}
						control={control}
						render={({ field: { onChange, ...rest } }) => (
							<CheckboxGroup
								defaultValue={[]}
								onChange={(val) => {
									onChange(val.map((v) => Number(v)));
								}}
								{...rest}
							>
								<Flex flexWrap='wrap'>
									{dietaryRestrictions &&
										dietaryRestrictions.map((dietaryRestriction) => (
											<Checkbox
												value={dietaryRestriction.id}
												key={dietaryRestriction.id}
												isChecked={getValues().dietaryRestrictionIds.includes(
													dietaryRestriction.id
												)}
												padding={'5px'}
											>
												{dietaryRestriction.name}
											</Checkbox>
										))}
								</Flex>
							</CheckboxGroup>
						)}
					/>
					<FormErrorMessage>
						{errors.dietaryRestrictionIds?.message}
					</FormErrorMessage>
				</FormControl>
				<FormControl>
					<FormLabel>Number of Slices</FormLabel>

					<Controller
						name='sliceQuantity'
						control={control}
						render={({ field: { onChange, ...rest } }) => (
							<NumberInput
								onChange={(_, n) => {
									setValue('sliceQuantity', n);
								}}
								{...rest}
							>
								<NumberInputField />
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
						)}
					/>
				</FormControl>
				<Button type='submit' colorScheme='blue' isDisabled={isSubmitting}>
					Create Order
				</Button>
			</VStack>
		</Box>
	);
};
