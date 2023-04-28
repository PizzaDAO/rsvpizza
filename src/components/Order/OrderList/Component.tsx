import {
	Box,
	Text,
	VStack,
	Spinner,
	Link,
	TableContainer,
	Table,
	TableCaption,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
} from '@chakra-ui/react';
import { FC } from 'react';
import NextLink from 'next/link';
import { DietaryRestriction, Order, Topping } from '@prisma/client';

/**
 * A utility function to get a value from an array of objects by matching a property
 * e.g. getValueByMatchingProperty('id', 1, 'name', [{id: 1, name: 'Bob'}]) returns 'Bob'
 * @param xKey the property to match
 * @param xValue the value of the property to match
 * @param yKey the property for which to return the value
 * @param items the array of items to search
 * @returns
 */
const getValueByMatchingProperty = <T, X extends keyof T, Y extends keyof T>(
	xKey: X,
	xValue: T[X],
	yKey: Y,
	items: T[]
): T[Y] | undefined => {
	const foundItem = items.find((item) => item[xKey] === xValue);
	return foundItem ? foundItem[yKey] : undefined;
};

interface OrderListProps {
	orders: Order[] | null | undefined;
	toppings: Topping[];
	dietaryRestrictions: DietaryRestriction[];
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
	//error: string;
}

export const OrderList: FC<OrderListProps> = ({
	orders,
	toppings,
	dietaryRestrictions,
	isLoading,
	isSuccess,
	isError,
	//error,
}) => {
	if (isLoading) return <Spinner />;
	if (isError) return <div>Something went wrong!</div>;
	if (!isLoading && !isError && orders && orders.length === 0)
		return <div>No orders found</div>;

	return (
		<>
			{orders && (
				<TableContainer>
					<Table variant='striped' colorScheme='slate'>
						<TableCaption>Events Pizza Orders</TableCaption>
						<Thead>
							<Tr>
								<Th>Dietary Restrictions</Th>
								<Th>Toppings</Th>
								<Th>Slice Qty</Th>
							</Tr>
						</Thead>
						<Tbody>
							{orders.map((order) => (
								<Tr key={order.id}>
									<Td>
										{(order.dietaryRestrictionIds as number[])
											.map((id) =>
												getValueByMatchingProperty(
													'id',
													id,
													'name',
													dietaryRestrictions
												)
											)
											.join(', ') || 'None'}
									</Td>
									<Td>
										{(order.toppingIds as number[])
											.map((id) =>
												getValueByMatchingProperty('id', id, 'name', toppings)
											)
											.join(', ') || 'None'}
									</Td>
									<Td>{order.sliceQuantity}</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			)}
		</>
	);
};

export default OrderList;
