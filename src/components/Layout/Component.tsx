import { Container } from '@chakra-ui/react';
import styles from '../../pages/index.module.css';
import { FC, PropsWithChildren } from 'react';

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Container
			className={styles.main}
			alignContent={'space-between'}
			maxW={'100%'}
		>
			{children}
		</Container>
	);
};

export default Layout;
