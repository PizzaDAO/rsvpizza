import { Box, Flex, Spacer, Text, VStack } from '@chakra-ui/react';
import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs';
import { NextPage } from 'next';
import Head from 'next/head';
import { CreateDietaryRestriction, DietaryRestrictionList } from '~/components';
import { api } from '~/utils/api';

export const DietaryRestrictions: NextPage = () => {
	const user = useUser();

	const {
		data: isAdmin,
		isLoading: checkAdminLoading,
		isError: checkAdminError,
	} = api.users.isAdmin.useQuery(undefined, { enabled: user.isSignedIn });

	const { data, isLoading, isError } = api.dietaryRestrictions.getAll.useQuery(
		undefined,
		{
			enabled: user.isSignedIn && isAdmin,
		}
	);

	return (
		<>
			<Head>
				<title>Admin - Users</title>
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
							<CreateDietaryRestriction />
							<SignOutButton />
						</Box>
					</>
				) : !user.isSignedIn ? (
					<SignInButton />
				) : (
					<Text>
						You must be a system admin to add new dietary restriction types. If
						you should be, contact the pizza mafia to be added
					</Text>
				)}
				<Spacer mb={8} />
				<VStack spacing={6} alignItems='center' flexGrow={1}>
					<DietaryRestrictionList
						dietaryRestrictions={data}
						isLoading={isLoading}
						isError={isError}
					/>
				</VStack>
			</Flex>
		</>
	);
};

export default DietaryRestrictions;
