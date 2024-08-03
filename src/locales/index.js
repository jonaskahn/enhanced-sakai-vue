import { createI18n } from 'vue-i18n';
import en from '@/locales/en';
import vi from '@/locales/vi';
import settings from '@/constants/settings';

const LOCALE_OPTIONS = [
    {
        name: 'Tiếng Việt',
        value: 'vi',
        code: 'VN'
    },

    {
        name: 'English',
        value: 'en',
        code: 'US'
    }
];

function getCurrentLocale() {
    return localStorage.getItem(settings.CURRENT_LOCALE) || import.meta.env.VITE_DEFAULT_LOCALE;
}

function setCurrentLocale(value) {
    localStorage.setItem(settings.CURRENT_LOCALE, value || import.meta.env.VITE_DEFAULT_LOCALE);
}

const i18n = createI18n({
    locale: getCurrentLocale(),
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
    legacy: false,
    allowComposition: true,
    messages: {
        en: en,
        vi: vi
    }
});

function switchLocale(locale) {
    i18n.global.locale.value = locale;
    document.querySelector('html').setAttribute('lang', locale);
    setCurrentLocale(locale);
}

export { LOCALE_OPTIONS, getCurrentLocale, switchLocale };

export function translate(key) {
    return i18n.global.t(key);
}

export default i18n;
