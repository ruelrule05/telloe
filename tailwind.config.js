const colors = require('tailwindcss/colors');
module.exports = {
	purge: ['./resources/**/*.blade.php', './resources/**/*.js', './resources/**/*.vue'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontFamily: {
			sans: ['Manrope', 'sans-serif'],
			serif: ['Monument Extended', 'serif']
		},

		container: {
			center: true,
			padding: '2rem'
		},

		colors: {
			primary: {
				light: '#4f7ff0',
				DEFAULT: '#3167e3',
				dark: '#1e52c9'
			},
			secondary: '#fae6e2',
			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black,
			white: colors.white,
			gray: colors.coolGray,
			red: colors.red,
			yellow: colors.amber,
			green: colors.emerald,
			blue: colors.blue,
			indigo: colors.indigo,
			purple: colors.violet,
			pink: colors.pink
		},
		fill: theme => ({
			primary: theme('colors.primary.DEFAULT'),
			white: theme('colors.white')
		}),
		extend: {}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
