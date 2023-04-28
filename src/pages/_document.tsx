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
					<link
						rel='stylesheet'
						href='https://unpkg.com/leaflet@1.7.1/dist/leaflet.css'
						integrity='sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=='
						crossOrigin=''
					/>
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
