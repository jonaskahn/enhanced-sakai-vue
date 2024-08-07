<script setup>
import { onBeforeMount } from 'vue';
import { SettingService } from '@/service/SettingService';
import { useThemeSetting } from '@/layout/composables/theme';
import { updatePreset, updateSurfacePalette } from '@primevue/themes';
import { useLayout } from '@/layout/composables/layout';
import useAuthStore from '@/store/authStore';

const settingService = SettingService.INSTANCE;
const { primaryColors, surfaces, getPresetExtColor } = useThemeSetting();
const { switchOnDarkMode } = useLayout();

const initialPreset = () => {
    const primaryColor = primaryColors.value.find((c) => c.name === settingService.getPrimaryTheme());
    const presetColor = getPresetExtColor(primaryColor);
    updatePreset(presetColor);
};

const initialSurface = () => {
    const surfacePalette = surfaces.value.find((s) => s.name === settingService.getSurfaceTheme())?.palette;
    updateSurfacePalette(surfacePalette);
};

const { updateExpiration } = useAuthStore();

onBeforeMount(() => {
    initialPreset();
    initialSurface();
    switchOnDarkMode();
    updateExpiration();
});
</script>

<template>
    <div>
        <Toast draggable="false" error-icon="pi pi-times-circle" group="desktop" info-icon="pi pi-info-circle" position="top-right" success-icon="pi pi-check-circle" warn-icon="pi pi-exclamation-circle" />
        <Toast draggable="false" error-icon="pi pi-times-circle" group="mobile" info-icon="pi pi-info-circle" position="top-center" success-icon="pi pi-check-circle" warn-icon="pi pi-exclamation-circle" />
        <router-view v-slot="{ Component }">
            <transition mode="out-in" name="slide-fade">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>

<style scoped></style>
