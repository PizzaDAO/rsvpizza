import { Flex, Spinner, VStack } from '@chakra-ui/react';
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
		data: event,
		isLoading: eventIsLoading,
		isError: eventIsError,
		error: eventError,
	} = api.events.getBySlug.useQuery(eventSlug as string, {
		enabled: !!eventSlug,
	});

	const {
		data: orders,
		isLoading: ordersIsLoading,
		isError: ordersIsError,
		isSuccess: ordersIsSuccess,
		error: ordersError,
	} = api.orders.getAllByEvent.useQuery(event?.id as string, {
		enabled: !!event,
		select: (orders) => transformOrdersData(orders),
	});

	const {
		data: toppings,
		isLoading: toppingsIsLoading,
		isSuccess: toppingsIsSuccess,
		isError: toppingsIsError,
		error: toppingsError,
	} = api.toppings.getAll.useQuery();

	const {
		data: dietaryRestrictions,
		isLoading: dietaryRestrictionsIsLoading,
		isSuccess: dietaryRestrictionsIsSuccess,
		isError: dietaryRestrictionsIsError,
		error: dietaryRestrictionsError,
	} = api.dietaryRestrictions.getAll.useQuery();

	// Handle loading and error states
	if (eventIsLoading) {
		return <Spinner />;
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
					content={`Make your pizza order for the ${event.name} event!}`}
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
						events={[event]}
						isLoading={eventIsLoading}
						isError={eventIsError}
					/>
					<CreateOrder
						eventId={event.id}
						toppings={toppings}
						dietaryRestrictions={dietaryRestrictions}
					/>
					{(ordersIsLoading ||
						toppingsIsLoading ||
						dietaryRestrictionsIsLoading) && <Spinner />}

					{ordersIsSuccess &&
						toppingsIsSuccess &&
						dietaryRestrictionsIsSuccess && (
							<OrderList
								orders={orders}
								toppings={toppings}
								dietaryRestrictions={dietaryRestrictions}
								isLoading={
									ordersIsLoading ||
									toppingsIsLoading ||
									dietaryRestrictionsIsLoading
								}
								isSuccess={
									ordersIsSuccess &&
									toppingsIsSuccess &&
									dietaryRestrictionsIsSuccess
								}
								isError={
									ordersIsError || toppingsIsError || dietaryRestrictionsIsError
								}
								/* error={`orders error: ${ordersError?.message}
								 | toppings error: ${toppingsError?.message} 
								 | dietary restrictions error:  ${dietaryRestrictionsError?.message}`} */
							/>
						)}
				</VStack>
			</Flex>
		</>
	);
};

export default EventPage;
