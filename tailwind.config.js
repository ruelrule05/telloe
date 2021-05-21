const colors = require('tailwindcss/colors');
let coolGray = colors.coolGray;
coolGray['50'] = '#F8F8F9';
module.exports = {
	purge: ['./resources/**/*.blade.php', './resources/**/*.js', './resources/**/*.vue'],
	darkMode: false, // or 'media' or 'class
	theme: {
		fontFamily: {
			sans: ['Manrope', 'sans-serif'],
			serif: ['Monument Extended', 'serif']
		},

		container: {
			center: true,
			padding: '0.75rem'
		},

		colors: {
			body: '#39445B',
			muted: '#838EA6',
			primary: {
				ultralight: '#E9EEFC',
				light: '#718CEF',
				DEFAULT: '#3167e3',
				dark: '#1e52c9'
			},
			secondary: {
				light: '#F8F8F9',
				DEFAULT: '#fae6e2'
			},
			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black,
			white: colors.white,
			gray: coolGray,
			red: colors.red,
			yellow: colors.amber,
			green: colors.emerald,
			blue: colors.blue,
			indigo: colors.indigo,
			purple: colors.violet,
			pink: colors.pink
		},
		fill: theme => ({
			current: 'currentColor'
		}),

		fontSize: {
			xs: ['0.75rem', { lineHeight: '1rem' }],
			sm: ['0.875rem', { lineHeight: '1.25rem' }],
			base: ['1rem', { lineHeight: '1.5rem' }],
			lg: ['1.125rem', { lineHeight: '1.75rem' }],
			xl: ['1.25rem', { lineHeight: '1.75rem' }],
			'2xl': ['1.5rem', { lineHeight: '2rem' }],
			'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
			'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
			'5xl': ['3rem', { lineHeight: '3.5rem' }],
			'6xl': ['3.75rem', { lineHeight: '1' }],
			'7xl': ['4.5rem', { lineHeight: '1' }],
			'8xl': ['6rem', { lineHeight: '1' }],
			'9xl': ['8rem', { lineHeight: '1' }],
			'home-heading': ['5rem', { lineHeight: '64px' }]
		},

		fontWeight: {
			light: '300',
			normal: '500',
			medium: '600',
			semibold: '700',
			bold: '800',
			extrabold: '900'
		},

		textColor: theme => theme('colors'),
		extend: {}
	},
	variants: {
		extend: {}
	},
	plugins: [require('@tailwindcss/line-clamp')]
};
