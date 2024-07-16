import { createI18n } from 'vue-i18n';
import GlobalSettingService from '@/service/GlobalSettingService';
import en from '@/locales/en-US';
import vi from '@/locales/vi-VN';

export const LOCALE_OPTIONS = [
    {
        label: 'Tiếng Việt',
        value: 'vi-VN',
        icon: 'fi fi-vn'
    },

    {
        label: 'English',
        value: 'en-US',
        icon: 'fi fi-us'
    }
];

const defaultLocale = GlobalSettingService.instance.getCurrentLocale();

const i18n = createI18n({
    locale: defaultLocale,
    fallbackLocale: 'en-US',
    legacy: false,
    allowComposition: true,
    messages: {
        'en-US': en,
        'vi-VN': vi
    }
});

export function switchLocale(locale) {
    i18n.global.locale.value = locale;
    document.querySelector('html').setAttribute('lang', locale);
}

export default i18n;
