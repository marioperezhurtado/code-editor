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

export const LANGUAGES = [
	{ title: 'English', code: 'en' },
	{ title: 'Español', code: 'es' },
	{ title: 'Français', code: 'fr' }
] as const;
type Language = (typeof LANGUAGES)[number]['code'];

export const FONT_SIZES = [
	{ title: '12px', code: '12px' },
	{ title: '14px', code: '14px' },
	{ title: '16px (Default)', code: '16px' },
	{ title: '18px', code: '18px' },
	{ title: '20px', code: '20px' }
];
type FontSize = (typeof FONT_SIZES)[number]['code'];

export const colorTheme = persisted<Theme>('color-theme', COLOR_THEMES[0].code);
export const language = persisted<Language>('language', LANGUAGES[0].code);
export const fontSize = persisted<FontSize>('font-size', FONT_SIZES[2].code);
