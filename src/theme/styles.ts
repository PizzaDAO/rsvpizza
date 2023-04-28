export const customStyles = {
	global: {
		// Add your global styles here
		html: {
			padding: 0,
			margin: 0,
		},
		body: {
			padding: 0,
			margin: 0,
			fontFamily:
				'-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
			color: 'white',
		},
		a: {
			color: 'inherit',
			textDecoration: 'none',
		},
		'*': {
			boxSizing: 'border-box',
		},
		// Add your custom styles here
		'.rdt': {
			position: 'relative',
		},
		'.rdtPicker': {
			background: 'white',
			border: '1px solid #ccc',
			padding: '10px',
			borderRadius: '3px',
			zIndex: '1000',
		},
		'.autocomplete-dropdown-container': {
			position: 'relative',
			width: '100%',
		},
		'.autocomplete-dropdown': {
			position: 'absolute',
			zIndex: '1000',
			width: '100%',
			background: 'white',
			border: '1px solid #ccc',
			borderRadius: '3px',
		},
	},
};

export default customStyles;
