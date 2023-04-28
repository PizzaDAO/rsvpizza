import { TableProps } from '@chakra-ui/react';
// Use mode later for light/dark mode support.
// defaulting to always dark mode for now.
import { mode } from '@chakra-ui/theme-tools';

export const customTable = {
	variants: {
		striped: {
			parts: ['tbody'],
			tbody: {
				tr: {
					'&:nth-of-type(odd)': {
						backgroundColor: 'slate.500',
					},
				},
			},
		},
	},
};

export default customTable;
