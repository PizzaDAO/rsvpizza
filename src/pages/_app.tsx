import { type AppType } from 'next/app';

import { api } from '~/utils/api';

import { ChakraProvider, GlobalStyle } from '@chakra-ui/react';
import theme from '../theme';

import { ClerkProvider } from '@clerk/nextjs';
import Layout from '~/components/Layout/Component';

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<ChakraProvider theme={theme}>
			<ClerkProvider {...pageProps}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ClerkProvider>
		</ChakraProvider>
	);
};

export default api.withTRPC(MyApp);
