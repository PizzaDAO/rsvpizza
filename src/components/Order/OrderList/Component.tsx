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
import { Order } from '~/schemas';
import NextLink from 'next/link';

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
					<Table variant='striped' colorScheme='teal'>
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
									<Td>order.dietaryRestrictions</Td>
									<Td>order.toppings</Td>
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
