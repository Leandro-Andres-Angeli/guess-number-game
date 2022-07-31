/*@type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
	content: ['./*.{html,js}'],
	theme: {
		colors: {
			lightblue: '#46c3db',
			darkblue: '#482ff7',
			red: colors.red,
			blue: colors.blue,
			green: colors.green,
			white: colors.white,
		},
		extend: {},
	},
	plugins: [],
};
