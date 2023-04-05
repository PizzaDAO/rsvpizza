import { type AppType } from 'next/app';

import { api } from '~/utils/api';

import { ChakraProvider, GlobalStyle } from '@chakra-ui/react';
import theme from '../theme';

import '~/styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<ChakraProvider theme={theme}>
			<ClerkProvider {...pageProps}>
				<Component {...pageProps} />
			</ClerkProvider>
		</ChakraProvider>
	);
};

export default api.withTRPC(MyApp);
