import { Box, Flex, Spacer, Text, VStack } from '@chakra-ui/react';
import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs';
import { NextPage } from 'next';
import Head from 'next/head';
import { CreateUser, UserList } from '~/components';
import { api } from '~/utils/api';

export const Users: NextPage = () => {
	const user = useUser();

	const {
		data: isAdmin,
		isLoading: checkAdminLoading,
		isError: checkAdminError,
	} = api.users.isAdmin.useQuery(undefined, { enabled: user.isSignedIn });

	const { data, isLoading, isError } = api.users.getAll.useQuery(undefined, {
		enabled: user.isSignedIn && isAdmin,
	});

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
							<CreateUser />
							<SignOutButton />
						</Box>
						<Spacer mb={8} />
						<VStack spacing={6} alignItems='center' flexGrow={1}>
							<UserList users={data} isLoading={isLoading} isError={isError} />
						</VStack>
					</>
				) : !user.isSignedIn ? (
					<SignInButton />
				) : (
					<>
						<Text>
							You are not an system admin. If you should be, contact the pizza
							mafia to be added
						</Text>
						<SignOutButton />
					</>
				)}
			</Flex>
		</>
	);
};

export default Users;
