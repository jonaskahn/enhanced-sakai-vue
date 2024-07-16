import settings from '@/constants/settings';

export default class GlobalSettingService {
    static instance = new GlobalSettingService();

    getCurrentLocale() {
        return localStorage.getItem(settings.CURRENT_LOCALE) || 'vi-VN';
    }

    async setCurrentLocale(value) {
        return localStorage.setItem(settings.CURRENT_LOCALE, value);
    }

    useRippleMode() {
        return localStorage.getItem(settings.RIPPLE_MODE) === 'on';
    }

    async setRippleMode(value) {
        localStorage.setItem(settings.RIPPLE_MODE, value ? 'on' : 'off');
    }

    useFocusRing() {
        return localStorage.getItem(settings.PREFER_THEME_FOCUS_RING) === 'on';
    }

    async setFocusRing(value) {
        return localStorage.setItem(settings.PREFER_THEME_FOCUS_RING, value ? 'on' : 'off');
    }

    useCompactMaterial() {
        return localStorage.getItem(settings.PREFER_THEME_COMPACT_MATERIAL) === 'on';
    }

    async setCompactMaterial(value) {
        localStorage.setItem(settings.PREFER_THEME_COMPACT_MATERIAL, value ? 'on' : 'off');
    }

    getInputStyle() {
        return localStorage.getItem(settings.INPUT_SETTING) === 'filled' ? 'filled' : 'outlined';
    }

    async setInputStyle(value) {
        localStorage.setItem(settings.INPUT_SETTING, value);
    }

    useDarkMode() {
        return localStorage.getItem(settings.DARK_MODE) === 'on';
    }

    async setDarkMode(value) {
        localStorage.setItem(settings.DARK_MODE, value ? 'on' : 'off');
    }

    getMenuMode() {
        return localStorage.getItem(settings.MENU_MODE) || 'static';
    }

    async setMenuMode(value) {
        localStorage.setItem(settings.MENU_MODE, value);
    }

    getTheme() {
        return localStorage.getItem(settings.PREFER_THEME) || 'md-light-indigo';
    }

    async setTheme(value) {
        localStorage.setItem(settings.PREFER_THEME, value);
    }

    async setScaleFactor(value) {
        localStorage.setItem(settings.SCALE_FACTOR, value);
    }

    getScaleFactor() {
        let scale = Number(localStorage.getItem(settings.SCALE_FACTOR));
        return scale <= 12 ? 12 : scale;
    }
}
