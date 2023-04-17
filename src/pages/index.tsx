import React from 'react';
import { type NextPage } from 'next';
import Head from 'next/head';

import { api } from '~/utils/api';
import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs';
import { Box, Text, VStack, Spacer, Flex, Spinner } from '@chakra-ui/react';
import { CreateEvent, EventList } from '~/components';

const Home: NextPage = () => {
	const user = useUser();

	const { data, isLoading, isError } = api.events.getAll.useQuery(undefined, {
		enabled: user.isSignedIn,
	});

	return (
		<>
			<Head>
				<title>Home - rsvPizza</title>
				<meta
					name='description'
					content="PizzaDAO's free event planning tool; Create an event. Share the event link to collect everybody's pizza orders. Perfect for any party or gathering!"
				/>
			</Head>
			<Flex
				direction='column'
				minHeight='100vh'
				paddingTop={6}
				paddingBottom={6}
			>
				{user.isSignedIn ? (
					<>
						<Box alignSelf={'center'}>
							<CreateEvent profileImageUrl={user.user.profileImageUrl} />
							<SignOutButton />
						</Box>
						<Spacer mb={8} />
						<VStack spacing={6} alignItems='center' flexGrow={1}>
							<EventList
								events={data}
								isLoading={isLoading}
								isError={isError}
							/>
						</VStack>
					</>
				) : (
					<SignInButton />
				)}
			</Flex>
		</>
	);
};

export default Home;
