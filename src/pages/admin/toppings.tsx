import { Box, Flex, Spacer, Text, VStack } from '@chakra-ui/react';
import { useUser } from '@clerk/nextjs';
import { NextPage } from 'next';
import Head from 'next/head';
import { CreateTopping, ToppingList } from '~/components';
import { api } from '~/utils/api';

export const Toppings: NextPage = () => {
	const user = useUser();

	const {
		data: isAdmin,
		isLoading: checkAdminLoading,
		isError: checkAdminError,
	} = api.users.isAdmin.useQuery(undefined, { enabled: user.isSignedIn });

	const { data, isLoading, isError } = api.toppings.getAll.useQuery(undefined, {
		enabled: user.isSignedIn && isAdmin,
	});

	return (
		<>
			<Head>
				<title>Admin - Toppings</title>
				<meta name='description' content='' />
			</Head>
			<Flex
				direction='column'
				minHeight='100vh'
				paddingTop={6}
				paddingBottom={6}
			>
				{user.isSignedIn && isAdmin ? (
					<>
						<Box alignSelf={'center'}>
							<CreateTopping />
						</Box>
					</>
				) : !user.isSignedIn ? (
					<Text>
						{`You must be signed in and a system admin to add new topping types.
						If you're supposed to be an admin, contact PizzaDAO and the pizza
						mafia to be added`}
					</Text>
				) : (
					<Text>
						{`You must be a system admin to add new topping types. If you're
						supposed to be an admin, contact PizzaDAO and the pizza mafia to be
						added`}
					</Text>
				)}
				<Spacer mb={8} />
				<VStack spacing={6} alignItems='center' flexGrow={1}>
					<ToppingList
						toppings={data}
						isLoading={isLoading}
						isError={isError}
					/>
				</VStack>
			</Flex>
		</>
	);
};

export default Toppings;
