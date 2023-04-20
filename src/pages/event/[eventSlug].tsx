import { Flex, VStack } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { CreateOrder, EventList, OrderList } from '~/components';
import { api, transformOrdersData } from '~/utils/api';

// Your other imports

const EventPage: NextPage = () => {
	const router = useRouter();
	const { eventSlug } = router.query;

	const {
		data: eventData,
		isLoading: eventIsLoading,
		isError: eventIsError,
		error: eventError,
	} = api.events.getBySlug.useQuery(eventSlug as string, {
		enabled: !!eventSlug,
	});

	const {
		data: ordersData,
		isLoading: ordersIsLoading,
		isError: ordersIsError,
		error: ordersError,
	} = api.orders.getAllByEvent.useQuery(eventData?.id as string, {
		enabled: !!eventData,
		select: (orders) => transformOrdersData(orders),
	});

	// Handle loading and error states
	if (eventIsLoading) {
		return <div>Loading...</div>;
	}

	if (eventIsError) {
		return <div>Error: {eventError.message}</div>;
	}

	return (
		<>
			<Head>
				<title>Event - rsv your P</title>
				<meta
					name='description'
					content={`Make your pizza order for the ${eventData.name} event!}`}
				/>
			</Head>
			<Flex
				direction='column'
				minHeight='100vh'
				paddingTop={6}
				paddingBottom={6}
			>
				<VStack spacing={6} alignItems='center' flexGrow={1}>
					<EventList
						events={[eventData]}
						isLoading={eventIsLoading}
						isError={eventIsError}
					/>
					<CreateOrder eventId={eventData.id} />
					<OrderList
						orders={ordersData}
						isLoading={ordersIsLoading}
						isError={ordersIsError}
					/>
				</VStack>
			</Flex>
		</>
	);
};

export default EventPage;
