import settings from '@/constants/settings';

export default class LocaleService {
    static INSTANCE = new LocaleService();
    static SUPPORTED_LOCALES = [
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

    getCurrentLocale() {
        return localStorage.getItem(settings.CURRENT_LOCALE) || 'en-US';
    }

    setCurrentLocale(value) {
        localStorage.setItem(settings.CURRENT_LOCALE, value);
    }
}
