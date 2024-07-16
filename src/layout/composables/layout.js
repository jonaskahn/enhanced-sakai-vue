import { toRefs, reactive, computed } from 'vue';
import GlobalSettingService from '@/service/GlobalSettingService';

const globalSettingService = GlobalSettingService.instance;

const layoutConfig = reactive({
    ripple: globalSettingService.useRippleMode(),
    darkTheme: globalSettingService.useDarkMode(),
    inputStyle: globalSettingService.getInputStyle(),
    menuMode: globalSettingService.getMenuMode(),
    theme: globalSettingService.getTheme(),
    scale: globalSettingService.getScaleFactor(),
    focusRing: globalSettingService.useFocusRing(),
    compactMaterial: globalSettingService.useCompactMaterial(),
    activeMenuItem: null
});

const layoutState = reactive({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false
});

export function useLayout() {
    const setScale = (scale) => {
        layoutConfig.scale = scale;
        globalSettingService.setScaleFactor(scale);
    };

    const setActiveMenuItem = (item) => {
        layoutConfig.activeMenuItem = item.value || item;
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

    const isSidebarActive = computed(() => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive);

    const isDarkTheme = computed(() => layoutConfig.darkTheme);

    return { layoutConfig: toRefs(layoutConfig), layoutState: toRefs(layoutState), setScale, onMenuToggle, isSidebarActive, isDarkTheme, setActiveMenuItem };
}
