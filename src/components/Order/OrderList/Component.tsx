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

interface OrderListProps {
	orders: Order[] | null | undefined;
	isLoading: boolean;
	isError: boolean;
}

export const OrderList: FC<OrderListProps> = ({
	orders,
	isLoading,
	isError,
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
										{(order.dietaryRestrictions as DietaryRestriction[]).reduce(
											(acc, curr, index) =>
												index === 0 ? curr.name : acc + ' + ' + curr.name,
											''
										)}
									</Td>
									<Td>
										{(order.toppings as Topping[]).reduce(
											(acc, curr, index) =>
												index === 0 ? curr.name : acc + ' + ' + curr.name,
											''
										)}
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
