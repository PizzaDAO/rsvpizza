import { Box, Text, VStack, Spinner, Link } from '@chakra-ui/react';
import { FC } from 'react';
import { Event } from '~/schemas/event';
import NextLink from 'next/link';

interface EventListProps {
	events: Event[] | null | undefined;
	isLoading: boolean;
	isError: boolean;
}

export const EventList: FC<EventListProps> = ({
	events,
	isLoading,
	isError,
}) => {
	if (isLoading) return <Spinner />;
	if (isError) return <div>Something went wrong!</div>;
	if (!isLoading && !isError && events && events.length === 0)
		return <div>No events found</div>;

	return (
		<VStack spacing={6} alignItems='center' flexGrow={1}>
			{events &&
				events.map((event) => (
					<Box
						key={event.id}
						bgColor={'#181726'}
						w={'200%'}
						borderRadius={'md'}
						borderWidth={'1px'}
						borderColor={'gray.300'}
						p={4}
						position={'relative'}
						boxShadow={'md'}
					>
						<Text
							placeSelf={'flex-end'}
							fontWeight={'medium'}
							fontStyle={'italic'}
							position={'absolute'}
							top={2}
							right={2}
						>
							{event.datetime.toDateString()}
						</Text>
						<Text as={'u'} fontSize={'2xl'} fontWeight={'bold'}>
							{event.name}
						</Text>
						<Text mt={2}>{event.description}</Text>
						<Text mt={2}>Location: {event.location}</Text>
						<Text mt={2}>
							Reservation link:{' '}
							<Link as={NextLink} href={`/event/${event.slug}`}>
								{event.slug}
							</Link>
						</Text>
						<Text mt={2} fontWeight={'medium'}>
							Attendees: {event.attendees}
						</Text>
					</Box>
				))}
		</VStack>
	);
};

export default EventList;
