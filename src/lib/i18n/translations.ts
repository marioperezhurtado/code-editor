import i18n, { type Config } from 'sveltekit-i18n';

const config: Config = {
    initLocale: 'en',
    loaders: [
        {
            locale: 'en',
            key: '',
            loader: async () => (await import('./en.json')).default
        },
        {
            locale: 'es',
            key: '',
            loader: async () => (await import('./es.json')).default
        }
    ]
}

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);
