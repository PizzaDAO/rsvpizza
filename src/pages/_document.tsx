import { ColorModeScript } from '@chakra-ui/react';
import { env } from '~/env.mjs';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import theme from '~/theme';

class MyDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head>
					<script
						async
						src={`https://maps.googleapis.com/maps/api/js?key=${env.GOOGLE_MAPS_API_KEY}&libraries=places`}
					></script>
					<link rel='icon' href='/favicon.ico' />
				</Head>
				<body>
					<ColorModeScript initialColorMode={theme.config.initialColorMode} />
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
