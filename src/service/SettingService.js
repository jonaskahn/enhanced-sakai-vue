import settings from '@/constants/settings';

export class SettingService {
    static INSTANCE = new SettingService();

    isUseDarkMode() {
        return localStorage.getItem(settings.USE_DARK_MODE) === 'on';
    }

    setUseDarkMode(value) {
        localStorage.setItem(settings.USE_DARK_MODE, value ? 'on' : 'off');
    }

    getMenuMode() {
        return localStorage.getItem(settings.MENU_MODE) || 'static';
    }

    setMenuMode(value) {
        localStorage.setItem(settings.MENU_MODE, value);
    }

    getSurfaceTheme() {
        return localStorage.getItem(settings.SURFACE_THEME) || 'gray';
    }

    setSurfaceTheme(value) {
        localStorage.setItem(settings.SURFACE_THEME, value);
    }

    getPrimaryTheme() {
        return localStorage.getItem(settings.PRIMARY_THEME) || 'emerald';
    }

    setPrimaryTheme(value) {
        localStorage.setItem(settings.PRIMARY_THEME, value);
    }

    getPresetTheme() {
        return localStorage.getItem(settings.PRESET_THEME) || 'Lara';
    }

    setPresetTheme(value) {
        localStorage.setItem(settings.PRESET_THEME, value);
    }
}
