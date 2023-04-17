import { List, ListItem, Spinner, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { DietaryRestriction } from '~/schemas';

interface DietaryRestrictionListProps {
	dietaryRestrictions: DietaryRestriction[] | null | undefined;
	isLoading: boolean;
	isError: boolean;
}

export const DietaryRestrictionList: FC<DietaryRestrictionListProps> = ({
	dietaryRestrictions,
	isLoading,
	isError,
}) => {
	if (isLoading) return <Spinner />;
	if (isError) return <div>Something went wrong!</div>;
	if (
		!isLoading &&
		!isError &&
		dietaryRestrictions &&
		dietaryRestrictions.length === 0
	)
		return <div>No dietary restrictions found</div>;

	return (
		<>
			{dietaryRestrictions && (
				<>
					<Text>Dietary Restrictions</Text>
					<List spacing={3}>
						{dietaryRestrictions.map((dietaryRestriction) => (
							<ListItem key={dietaryRestriction.id}>
								{dietaryRestriction.name}
							</ListItem>
						))}
					</List>
				</>
			)}
		</>
	);
};

export default DietaryRestrictionList;
