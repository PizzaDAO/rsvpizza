import { Flex, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { EventList } from '~/components';
import { api } from '~/utils/api';

// Your other imports

const EventPage: React.FC = () => {
	const router = useRouter();
	const { eventSlug } = router.query;

	const { data, isLoading, isError, error } = api.events.getBySlug.useQuery(
		eventSlug as string
	);

	// Handle loading and error states
	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<>
			<Head>
				<title>Event - rsv your P</title>
				<meta
					name='description'
					content={`Make your pizza order for the ${data.name} event!}`}
				/>
			</Head>
			<Flex
				direction='column'
				minHeight='100vh'
				paddingTop={6}
				paddingBottom={6}
			>
				<VStack spacing={6} alignItems='center' flexGrow={1}>
					<EventList events={[data]} isLoading={isLoading} isError={isError} />
				</VStack>
			</Flex>
		</>
	);
};

export default EventPage;
