module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/tw-elements/dist/js/**/*.js'],
	theme: {
		screens: {
			sm: '480px',
			md: '768px',
			lg: '976px',
			xl: '1440px',
		},
		fontFamily: {
			sans: ['Graphik', 'sans-serif'],
		},
		fontSize: {
			xs: [
				'10px',
				{
					lineHeight: '20px',
					letterSpacing: '-0.01em',
					fontWeight: '500',
				},
			],

			sm: [
				'13px',
				{
					lineHeight: '18px',
					letterSpacing: '-0.01em',
					fontWeight: '400',
				},
			],
			base: [
				'15px',
				{
					lineHeight: '20px',
					letterSpacing: '0',
					fontWeight: '400',
				},
			],

			xl: [
				'18px',
				{
					lineHeight: '20px',
					letterSpacing: '-0.01em',
					fontWeight: '500',
				},
			],
			'2xl': [
				'30px',
				{
					lineHeight: '32px',
					letterSpacing: '-0.01em',
				},
			],
		},
		extend: {},
	},
	plugins: [require('tw-elements/dist/plugin')],
};
