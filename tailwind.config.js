/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				dark: 'rgb(var(--dark) / <alpha-value>)',
				'dark-2': 'rgb(var(--dark-2) / <alpha-value>)',
				'dark-3': 'rgb(var(--dark-3) / <alpha-value>)',
				light: 'rgb(var(--light) / <alpha-value>)',
				'light-2': 'rgb(var(--light-2) / <alpha-value>)',
				accent: 'rgb(var(--accent) / <alpha-value>)'
			}
		}
	},
	plugins: []
};
