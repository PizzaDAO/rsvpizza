import { Spinner, List, ListItem, Text } from '@chakra-ui/react';
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
				<>
					<Text>Toppings</Text>
					<List spacing={3}>
						{toppings.map((topping) => (
							<ListItem key={topping.id}>{topping.name}</ListItem>
						))}
					</List>
				</>
			)}
		</>
	);
};

export default ToppingList;
