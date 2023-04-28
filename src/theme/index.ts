import { extendTheme } from '@chakra-ui/react';
import { customTable } from './components';
import { customColors } from './colors';
import { customStyles } from './styles';

export const theme = extendTheme({
	components: {
		Table: customTable,
	},
	colors: customColors,
	styles: customStyles,
	// Extend other parts of the theme if needed
});

export default theme;
