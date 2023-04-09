import { Box, Flex, Heading, VStack } from '@chakra-ui/react';
import { NextPage } from 'next';
import { EventForm } from './EventForm';
import { EventFormData } from './EventSchema';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { api } from '~/utils/api';
import generateUniqueSlug from '~/utils/generateUniqueSlug';

const CreateEvent: NextPage = () => {
	const { user } = useUser();
	console.log(user);
	if (!user) {
		return null;
	}

	const { mutate } = api.events.create.useMutation();

	const handleFormSubmit = (data: EventFormData) => {
		// Handle form submission here, such as calling an API or updating state
		console.log('Form submitted with data:', data);
		const newData = { ...data, slug: generateUniqueSlug() };
		mutate(newData);
	};

	return (
		<Flex
			position={'relative'}
			flexDirection={'row'}
			justifyContent={'flex-start'}
			bgColor={'red.500'}
			w={'500px'}
		>
			<Flex position={'absolute'} top={'0'} left={'0'}>
				<Image
					src={user.profileImageUrl}
					alt={'Profile image'}
					width={128}
					height={128}
				/>
			</Flex>
			<VStack spacing={6}>
				<Heading>Create Event</Heading>
				<Box width='100%' maxWidth='600px'>
					<EventForm onSubmit={handleFormSubmit} />
				</Box>
			</VStack>
		</Flex>
	);
};

export default CreateEvent;
