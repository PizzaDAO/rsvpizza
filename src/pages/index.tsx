import React, { useState } from 'react';
import { type NextPage } from 'next';
import Head from 'next/head';
import { api } from '~/utils/api';
import { useUser } from '@clerk/nextjs';
import { Box, VStack, Spacer, Flex, Text, Button } from '@chakra-ui/react';
import { CreateEvent, EventList } from '~/components';
import { Event } from '~/schemas';

const partition = <T,>(
	array: T[] = [],
	predicate: (element: T) => boolean
): [T[], T[]] => {
	const truthy: Array<T> = [];
	const falsy: Array<T> = [];
	array.forEach((item) => {
		if (predicate(item)) {
			truthy.push(item);
		} else {
			falsy.push(item);
		}
	});
	return [truthy, falsy];
};

const isBeforeDate = (date: Date): ((event: Event) => boolean) => {
	return (event: Event) => {
		const eventDateOnly = new Date(
			event.datetime.getFullYear(),
			event.datetime.getMonth(),
			event.datetime.getDate() + 1
		);
		return date <= eventDateOnly;
	};
};

const Home: NextPage = () => {
	const [upcoming, setUpcoming] = useState(true);
	const user = useUser();

	const { data, isLoading, isError } = api.events.getAll.useQuery(undefined, {
		enabled: user.isSignedIn,
	});

	const pred = isBeforeDate(new Date());

	const [upcomingEvents, historicEvents] = partition(data, pred);
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
				width={'1000px'}
			>
				{user.isSignedIn ? (
					<>
						<Box alignSelf={'center'}>
							<CreateEvent profileImageUrl={user.user.profileImageUrl} />
						</Box>
						<Spacer mb={8} />
						<VStack spacing={6} alignItems='center' flexGrow={1}>
							<Text fontSize={'3xl'} as='u'>
								My Created Events
							</Text>
							<Flex>
								<Button
									mr={3}
									color={upcoming ? 'white' : 'slategray'}
									variant={'link'}
									onClick={() => setUpcoming(true)}
								>
									Upcoming
								</Button>
								<Button
									ml={3}
									color={upcoming ? 'slategray' : 'white'}
									variant={'link'}
									onClick={() => setUpcoming(false)}
								>
									Historic
								</Button>
							</Flex>
							{upcoming ? (
								<EventList
									events={upcomingEvents}
									isLoading={isLoading}
									isError={isError}
								/>
							) : (
								<EventList
									events={historicEvents}
									isLoading={isLoading}
									isError={isError}
								/>
							)}
						</VStack>
					</>
				) : (
					<>Please sign in to create an event</>
				)}
			</Flex>
		</>
	);
};

export default Home;
