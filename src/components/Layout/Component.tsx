import { Box } from '@chakra-ui/react';
import styles from '../../pages/index.module.css';
import { FC, PropsWithChildren } from 'react';
import { AppBar } from '../AppBar';

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Box className={styles.main} width='100%' flexDirection='column'>
			<AppBar />
			<Box bgColor={'#181726'} flexGrow={1}>
				{children}
			</Box>
		</Box>
	);
};

export default Layout;
