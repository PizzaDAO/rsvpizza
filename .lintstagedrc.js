const path = require('path');

const buildEslintCommand = (filenames) =>
	`next lint --fix --file ${filenames
		.map((f) => path.relative(process.cwd(), f))
		.join(' --file ')}`;

const formatPrettierCommand = (filenames) =>
	`npx prettier --write ${filenames.join(' ')}`;

const checkTypescriptCommand = () => 'npx tsc --noEmit';

module.exports = {
	'**/*.{js,jsx,ts,tsx}': [buildEslintCommand, formatPrettierCommand],
	'**/*.(ts|tsx)': [checkTypescriptCommand],
	'**/*.(md|json)': [formatPrettierCommand],
};
