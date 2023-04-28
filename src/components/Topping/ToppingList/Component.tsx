import {
	Spinner,
	TableContainer,
	Th,
	Tr,
	Thead,
	Table,
	Td,
	Tbody,
	TableCaption,
} from '@chakra-ui/react';
import { FC } from 'react';
import { Topping } from '~/schemas';

interface ToppingListProps {
	toppings: Topping[] | null | undefined;
	isLoading: boolean;
	isError: boolean;
}

export const ToppingList: FC<ToppingListProps> = ({
	toppings,
	isLoading,
	isError,
}) => {
	if (isLoading) return <Spinner />;
	if (isError) return <div>Something went wrong!</div>;
	if (!isLoading && !isError && toppings && toppings.length === 0)
		return <div>No toppings found</div>;

	return (
		<>
			{toppings && (
				<TableContainer>
					<Table size={'md'} variant='striped' colorScheme='slate'>
						<TableCaption>Toppings</TableCaption>
						<Thead>
							<Tr>
								<Th>Name</Th>
								<Th>Category</Th>
							</Tr>
						</Thead>
						<Tbody>
							{toppings.map((topping) => (
								<Tr key={topping.id}>
									<Td>{topping.name}</Td>
									<Td>{topping.category}</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			)}
		</>
	);
};

export default ToppingList;
