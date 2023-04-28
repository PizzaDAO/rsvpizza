import { FC } from 'react';
import {
	Flex,
	Link,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverArrow,
	PopoverBody,
	useColorModeValue,
} from '@chakra-ui/react';
import { SignInButton, SignOutButton, useAuth } from '@clerk/nextjs';
import { api } from '~/utils/api';
import NextLink from 'next/link';

export const AppBar: FC = () => {
	const bgColor = useColorModeValue('gray.100', 'gray.900');
	const textColor = useColorModeValue('gray.800', 'gray.200');
	const user = useAuth();

	const { data: userIsAdmin } = api.users.isAdmin.useQuery(undefined, {
		enabled: user.isSignedIn,
	});

	return (
		<Flex
			alignItems='center'
			justifyContent={'space-between'}
			direction={'row'}
			bg={'black'}
			color={'green.500'}
			boxShadow='md'
			p={4}
			width={'full'}
		>
			<Flex>
				<Link as={NextLink} href='/' mr={4}>
					rsvPizza
				</Link>
			</Flex>
			<Flex>
				{userIsAdmin && (
					<Popover trigger='hover'>
						<PopoverTrigger>
							<Link mr={4}>Admin</Link>
						</PopoverTrigger>
						<PopoverContent
							width={'auto'}
							bg='blue.800'
							borderColor={'slateblue'}
						>
							<PopoverArrow />
							<PopoverBody>
								<Link as={NextLink} display={'block'} href='/admin/users'>
									Users
								</Link>
								<Link as={NextLink} display={'block'} href='/admin/toppings'>
									Toppings
								</Link>
								<Link
									as={NextLink}
									display={'block'}
									href='/admin/dietaryRestrictions'
								>
									Dietary Restrictions
								</Link>
							</PopoverBody>
						</PopoverContent>
					</Popover>
				)}
				{user.isSignedIn && (
					<Popover trigger='hover'>
						<PopoverTrigger>
							<Link mr={4}>Events</Link>
						</PopoverTrigger>
						<PopoverContent
							width={'auto'}
							bg='blue.800'
							borderColor={'slateblue'}
						>
							<PopoverArrow />
							<PopoverBody>
								<Link as={NextLink} display={'block'} href='/events'>
									My Events
								</Link>
								<Link as={NextLink} display={'block'} href='/events/create'>
									Create Event
								</Link>
							</PopoverBody>
						</PopoverContent>
					</Popover>
				)}
				<Link as={NextLink} href='/about' mr={4}>
					About
				</Link>
				<Link as={NextLink} href='/contact' mr={4}>
					Contact
				</Link>
			</Flex>
			<Flex>{user.isSignedIn ? <SignOutButton /> : <SignInButton />}</Flex>
		</Flex>
	);
};

export default AppBar;
