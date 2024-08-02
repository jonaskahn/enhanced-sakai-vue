import { createI18n } from 'vue-i18n';
import en from '@/locales/en';
import vi from '@/locales/vi';
import settings from '@/constants/settings';
import { getCurrentInstance } from 'vue';

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
    return localStorage.getItem(settings.CURRENT_LOCALE) || 'en';
}

function setCurrentLocale(value) {
    localStorage.setItem(settings.CURRENT_LOCALE, value || 'en');
}

const i18n = createI18n({
    locale: getCurrentLocale(),
    fallbackLocale: 'en',
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
    const { appContext } = getCurrentInstance();
    return appContext.config.globalProperties.$i18n.t(key);
}

export default i18n;
