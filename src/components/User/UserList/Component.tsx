import {
	Spinner,
	TableContainer,
	Table,
	TableCaption,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
} from '@chakra-ui/react';
import { FC } from 'react';
import { User } from '~/schemas/user';

interface UserListProps {
	users: User[] | null | undefined;
	isLoading: boolean;
	isError: boolean;
}

export const UserList: FC<UserListProps> = ({ users, isLoading, isError }) => {
	if (isLoading) return <Spinner />;
	if (isError) return <div>Something went wrong!</div>;
	if (!isLoading && !isError && users && users.length === 0)
		return <div>No users found</div>;

	return (
		<>
			{users && (
				<TableContainer>
					<Table variant='striped' colorScheme='teal'>
						<TableCaption>Platform Native Users</TableCaption>
						<Thead>
							<Tr>
								<Th>ID</Th>
								<Th>Email</Th>
								<Th>Role</Th>
							</Tr>
						</Thead>
						<Tbody>
							{users.map((user) => (
								<Tr key={user.id}>
									<Td>{user.id}</Td>
									<Td>{user.email}</Td>
									<Td>{user.role}</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			)}
		</>
	);
};

export default UserList;
