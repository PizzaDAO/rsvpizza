/* eslint-disable react-hooks/rules-of-hooks */
import {
	Box,
	Flex,
	Heading,
	VStack,
	AspectRatio,
	useBreakpointValue,
} from '@chakra-ui/react';
import { FC, useEffect, useRef, useState } from 'react';
import { EventForm } from './EventForm';
import { EventFormData } from '~/schemas';
import { User } from '@clerk/clerk-sdk-node';
import Image from 'next/image';
import { api } from '~/utils/api';
import MapWrapper from './MapWrapper';

interface CreateEventProps {
	profileImageUrl: string;
}

export const CreateEvent: FC<CreateEventProps> = ({ profileImageUrl }) => {
	const { mutate } = api.events.create.useMutation();

	const handleFormSubmit = (data: EventFormData) => {
		// Handle form submission here, such as calling an API or updating state
		console.log('Form submitted with data:', data);
		// HACK: add slug to data so it can pass validation. This is a hacky way to do it
		// but it works for now. The events router replaces the slug with the generated
		// slug.
		const newData = { ...data, slug: '' };
		mutate(data);
	};

	const formWidth = useBreakpointValue({
		base: '100%',
		sm: '28em',
		md: '30em',
	});
	const mapWidth = useBreakpointValue({ base: '100%', sm: '28em', md: '30em' });

	const vStackRef = useRef<HTMLDivElement>(null);
	const [vStackHeight, setVStackHeight] = useState(0);

	useEffect(() => {
		if (vStackRef.current) {
			setVStackHeight(vStackRef.current.getBoundingClientRect().height);
		}
	}, [vStackRef]);

	return (
		<Flex
			position={'relative'}
			flexDirection={['column', 'column', 'row']}
			justifyContent={'flex-start'}
			bgColor={'blue.500'}
			w={['100%', '100%', '65em']}
			mx='auto'
		>
			<VStack spacing={6} ref={vStackRef}>
				<Flex justifyContent={'space-between'} alignItems='center' w='100%'>
					<Image
						src={profileImageUrl}
						alt={'Profile image'}
						width={128}
						height={128}
					/>
					<Heading>Create Event</Heading>
				</Flex>
				<Box width='100%'>
					<EventForm onSubmit={handleFormSubmit} />
				</Box>
			</VStack>
			<Box height={vStackHeight > 0 ? `${vStackHeight}px` : 'auto'}>
				<MapWrapper lat={51.505} lng={-0.09} />
			</Box>
		</Flex>
	);
};

export default CreateEvent;
