export const files = [
	{
		name: 'utils',
		files: [{ name: 'index.ts' }]
	},
	{
		name: 'components',
		files: [
			{
				name: 'ui',
				files: [{ name: 'Button.svelte' }, { name: 'Dropdown.svelte' }]
			},
			{
				name: 'Header',
				files: [{ name: 'Navbar.svelte' }, { name: 'Header.svelte' }, { name: 'store.ts' }]
			},
			{ name: 'Slider.svelte' }
		]
	},
	{ name: 'README.md' }
];

export type File = (typeof files)[number];
