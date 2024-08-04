import { computed, reactive, readonly } from 'vue';
import { SettingService } from '@/service/SettingService';

const settingService = SettingService.INSTANCE;

const layoutConfig = reactive({
    preset: settingService.getPresetTheme(),
    primary: settingService.getPrimaryTheme(),
    surface: settingService.getSurfaceTheme(),
    darkTheme: settingService.isUseDarkMode(),
    menuMode: settingService.getMenuMode()
});

const layoutState = reactive({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
    activeMenuItem: null
});

export function useLayout() {
    const setPrimary = (value) => {
        layoutConfig.primary = value;
        settingService.setPrimaryTheme(value);
    };

    const setSurface = (value) => {
        layoutConfig.surface = value;
        settingService.setSurfaceTheme(value);
    };

    const setPreset = (value) => {
        layoutConfig.preset = value;
        settingService.setPresetTheme(value);
    };

    const setActiveMenuItem = (item) => {
        layoutState.activeMenuItem = item.value || item;
    };

    const setMenuMode = (mode) => {
        layoutConfig.menuMode = mode;
        settingService.setMenuMode(mode);
    };

    const toggleDarkMode = () => {
        if (!document.startViewTransition) {
            executeDarkModeToggle();

            return;
        }

        document.startViewTransition(() => executeDarkModeToggle(event));
    };

    const switchOnDarkMode = () => {
        if (isDarkTheme.value) {
            document.documentElement.classList.toggle('app-dark');
        }
    };

    const executeDarkModeToggle = () => {
        const useDarkMode = !layoutConfig.darkTheme;
        settingService.setUseDarkMode(useDarkMode);
        layoutConfig.darkTheme = useDarkMode;
        document.documentElement.classList.toggle('app-dark');
    };

    const onMenuToggle = () => {
        if (layoutConfig.menuMode === 'overlay') {
            layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
        }

        if (window.innerWidth > 991) {
            layoutState.staticMenuDesktopInactive = !layoutState.staticMenuDesktopInactive;
        } else {
            layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
        }
    };

    const resetMenu = () => {
        layoutState.overlayMenuActive = false;
        layoutState.staticMenuMobileActive = false;
        layoutState.menuHoverActive = false;
    };

    const isSidebarActive = computed(() => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive);

    const isDarkTheme = computed(() => layoutConfig.darkTheme);

    const getPrimary = computed(() => layoutConfig.primary);

    const getSurface = computed(() => layoutConfig.surface);

    return {
        layoutConfig: readonly(layoutConfig),
        layoutState: readonly(layoutState),
        onMenuToggle,
        isSidebarActive,
        isDarkTheme,
        getPrimary,
        getSurface,
        setActiveMenuItem,
        toggleDarkMode,
        switchOnDarkMode,
        setPrimary,
        setSurface,
        setPreset,
        resetMenu,
        setMenuMode
    };
}
