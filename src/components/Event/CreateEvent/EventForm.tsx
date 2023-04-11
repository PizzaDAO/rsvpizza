import { useEffect, useState } from 'react';
import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Textarea,
	VStack,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	useToast,
	Grid,
	GridItem,
} from '@chakra-ui/react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EventFormSchema, EventFormData } from '~/schemas';
import 'react-datetime/css/react-datetime.css';

interface EventFormProps {
	onSubmit: (data: EventFormData) => void;
}

export const EventForm: React.FC<EventFormProps> = ({ onSubmit }) => {
	const {
		register,
		control,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<EventFormData>({
		resolver: zodResolver(EventFormSchema),
	});

	const [location, setLocation] = useState('');

	useEffect(() => {
		setValue('location', location);
	}, [location, setValue]);

	const toast = useToast();

	const handleLocationSelect = (address: string) => {
		setLocation(address);
	};

	const onFormSubmit = async (data: EventFormData) => {
		// Parse the datetime string into a Date object
		data.datetime = new Date(data.datetime);
		// Add a success toast notification
		toast({
			title: 'Event created.',
			description: 'Your event has been successfully created.',
			status: 'success',
			duration: 5000,
			isClosable: true,
		});

		onSubmit(data);

		// Clear the form and location state
		reset();
		setLocation('');
	};

	return (
		<Box as='form' onSubmit={handleSubmit(onFormSubmit)}>
			<Grid
				templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
				gap={4}
			>
				<GridItem colSpan={{ base: 1, md: 2 }}>
					<FormControl isInvalid={!!errors.name}>
						<FormLabel htmlFor='name'>Event Name</FormLabel>
						<Input
							id='name'
							{...register('name')}
							bg='gray.700'
							color='white'
						/>
						<FormErrorMessage>{errors.name?.message}</FormErrorMessage>
					</FormControl>
				</GridItem>

				<GridItem colSpan={{ base: 1, md: 2 }}>
					<FormControl isInvalid={!!errors.datetime}>
						<FormLabel htmlFor='datetime'>Date and Time</FormLabel>
						<Input
							type='datetime-local'
							id='datetime'
							{...register('datetime')}
							bg='gray.700'
							color='white'
						/>
						<FormErrorMessage>{errors.datetime?.message}</FormErrorMessage>
					</FormControl>
				</GridItem>

				<GridItem colSpan={{ base: 1, md: 2 }}>
					<FormControl isInvalid={!!errors.location}>
						<FormLabel htmlFor='location'>Location</FormLabel>
						<PlacesAutocomplete
							value={location}
							onChange={setLocation}
							onSelect={handleLocationSelect}
						>
							{({
								getInputProps,
								suggestions,
								getSuggestionItemProps,
								loading,
							}) => (
								<Box>
									<Input
										{...getInputProps({ id: 'location' })}
										bg='gray.700'
										color='white'
									/>
									<Box position='absolute' zIndex='10' width='100%' mt={1}>
										{loading && <div>Loading...</div>}
										{suggestions.map((suggestion) => (
											<Box
												{...getSuggestionItemProps(suggestion)}
												bg={suggestion.active ? 'black' : 'blackAlpha.500'}
												p={2}
												borderBottom='1px solid'
												borderColor='blue.200'
												key={suggestion.placeId}
											>
												{suggestion.description}
											</Box>
										))}
									</Box>
								</Box>
							)}
						</PlacesAutocomplete>
						<FormErrorMessage>{errors.location?.message}</FormErrorMessage>
					</FormControl>
				</GridItem>

				<GridItem colSpan={{ base: 1, md: 1 }}>
					<FormControl isInvalid={!!errors.attendees}>
						<FormLabel htmlFor='attendees'>Number of Attendees</FormLabel>
						<NumberInput defaultValue={0} min={0}>
							<NumberInputField
								id='attendees'
								{...register('attendees')}
								bg='gray.700'
								color='white'
							/>
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
						<FormErrorMessage>{errors.attendees?.message}</FormErrorMessage>
					</FormControl>
				</GridItem>

				<GridItem colSpan={{ base: 1, md: 2 }}>
					<FormControl isInvalid={!!errors.description}>
						<FormLabel htmlFor='description'>Description</FormLabel>
						<Textarea
							id='description'
							{...register('description')}
							bg='gray.700'
							color='white'
						/>
						<FormErrorMessage>{errors.description?.message}</FormErrorMessage>
					</FormControl>
				</GridItem>
			</Grid>

			<VStack mt={6} spacing={4}>
				<Button
					width='100%'
					type='submit'
					isLoading={isSubmitting}
					loadingText='Submitting'
					bg='gray.700'
					color='white'
					_hover={{ bg: 'gray.600' }}
					_active={{ bg: 'gray.800' }}
				>
					Create Event
				</Button>
			</VStack>
		</Box>
	);
};
