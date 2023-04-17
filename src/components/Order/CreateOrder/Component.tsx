import React, { useState } from 'react';
import {
	Box,
	Button,
	Checkbox,
	CheckboxGroup,
	FormControl,
	FormLabel,
	HStack,
	Input,
	NumberInput,
	NumberInputField,
	VStack,
} from '@chakra-ui/react';
import { OrderFormData } from '~/schemas/order';
import { api } from '~/utils/api';
import { Topping } from '~/schemas/topping';
import { DietaryRestriction } from '~/schemas/dietaryRestriction';

const initialFormValues: OrderFormData = {
	eventId: '',
	name: '',
	userId: '',
	dietaryRestrictions: [],
	toppings: [],
	sliceQuantity: 1,
};

interface CreateOrderProps {
	eventId: string;
	//toppings: Topping[];
	//dietaryRestrictions: DietaryRestriction[];
}

export const CreateOrder: React.FC<CreateOrderProps> = ({
	eventId,
	//toppings,
	//dietaryRestrictions,
}) => {
	const { data: toppings, isLoading: toppingsIsLoading } =
		api.toppings.getAll.useQuery();

	const { data: dietaryRestrictions, isLoading: dietaryRestrictionsIsLoading } =
		api.dietaryRestrictions.getAll.useQuery();

	const [formValues, setFormValues] = useState<OrderFormData>({
		...initialFormValues,
		eventId,
	});

	const { mutate } = api.orders.create.useMutation();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};

	const handleToppingsChange = (values: string[]) => {
		setFormValues({
			...formValues,
			toppings: values
				.filter((value) => value)
				.map((value) => JSON.parse(value)),
		});
	};

	const handleDietaryRestrictionsChange = (values: string[]) => {
		setFormValues({
			...formValues,
			dietaryRestrictions: values
				.filter((value) => value)
				.map((value) => JSON.parse(value)),
		});
	};

	const handleSliceQuantityChange = (
		valueAsString: string,
		valueAsNumber: number
	) => {
		setFormValues({ ...formValues, sliceQuantity: valueAsNumber });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		mutate(formValues);
	};

	return (
		<Box as='form' onSubmit={handleSubmit}>
			<VStack spacing={4} alignItems='stretch'>
				<FormControl>
					<FormLabel>Name (optional)</FormLabel>
					<Input name='name' value={formValues.name} onChange={handleChange} />
				</FormControl>
				<FormControl>
					<FormLabel>Toppings</FormLabel>
					<CheckboxGroup
						defaultValue={
							formValues.toppings.length > 0
								? formValues.toppings.map(
										(topping) => topping?.id?.toString() || ''
								  )
								: []
						}
						onChange={handleToppingsChange}
					>
						<HStack>
							{toppings &&
								toppings.map((topping) => (
									<Checkbox
										key={topping.id}
										value={JSON.stringify({
											id: topping.id,
											name: topping.name,
										})}
									>
										{topping.name}
									</Checkbox>
								))}
						</HStack>
					</CheckboxGroup>
				</FormControl>
				<FormControl>
					<FormLabel>Dietary Restrictions</FormLabel>
					<CheckboxGroup
						defaultValue={
							formValues.dietaryRestrictions.length > 0
								? formValues.dietaryRestrictions.map(
										(restriction) => restriction?.id?.toString() || ''
								  )
								: []
						}
						onChange={handleDietaryRestrictionsChange}
					>
						<HStack>
							{dietaryRestrictions &&
								dietaryRestrictions.map((restriction) => (
									<Checkbox
										key={restriction.id}
										value={JSON.stringify({
											id: restriction.id,
											name: restriction.name,
										})}
									>
										{restriction.name}
									</Checkbox>
								))}
						</HStack>
					</CheckboxGroup>
				</FormControl>
				<FormControl>
					<FormLabel>Slice Quantity</FormLabel>
					<NumberInput
						min={1}
						value={formValues.sliceQuantity}
						onChange={handleSliceQuantityChange}
					>
						<NumberInputField />
					</NumberInput>
				</FormControl>
				<Button type='submit' colorScheme='blue'>
					Create Order
				</Button>
			</VStack>
		</Box>
	);
};
