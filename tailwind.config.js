/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				dark: 'rgb(var(--dark) / <alpha-value>)',
				'dark-2': '#2d3748',
				'dark-3': '#4a5568',
				light: '#f7fafc',
				'light-2': '#a0aec0',
				accent: '#f56565'
			}
		}
	},
	plugins: []
};
