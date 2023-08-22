import { persisted } from '$lib/persisted/persisted';

export const COLOR_THEMES = [
	{ title: 'Dark (Code Editor)', code: 'dark' },
	{ title: 'Light (Code Editor)', code: 'light' },
	{ title: 'Monokai', code: 'monokai' },
	{ title: 'Github Light', code: 'github-light' },
	{ title: 'Moonlight', code: 'moonlight' },
	{ title: 'Synthwave', code: 'synthwave' },
	{ title: 'One Dark', code: 'one-dark' }
] as const;
type Theme = (typeof COLOR_THEMES)[number]['code'];

export const LOCALES = [
	{ title: 'English', code: 'en' },
	{ title: 'Español', code: 'es' },
] as const;
type Locale = (typeof LOCALES)[number]['code'];

export const FONT_SIZES = [
	{ title: '12px', code: '12px' },
	{ title: '14px', code: '14px' },
	{ title: '16px (Default)', code: '16px' },
	{ title: '18px', code: '18px' },
	{ title: '20px', code: '20px' }
];
type FontSize = (typeof FONT_SIZES)[number]['code'];

export const colorTheme = persisted<Theme>('color-theme', COLOR_THEMES[0].code);
export const locale = persisted<Locale>('locale', LOCALES[0].code);
export const fontSize = persisted<FontSize>('font-size', FONT_SIZES[2].code);
