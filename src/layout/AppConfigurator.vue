<script setup>
import { useLayout } from '@/layout/composables/layout';
import { $t, updatePreset, updateSurfacePalette } from '@primevue/themes';
import Aura from '@primevue/themes/aura';
import Lara from '@primevue/themes/lara';
import { ref } from 'vue';
import { useThemeSetting } from '@/layout/composables/theme';

const props = defineProps({ showMenuMode: Boolean });

const { layoutConfig, setPrimary, setSurface, setPreset, isDarkTheme, setMenuMode } = useLayout();
const { primaryColors, surfaces, getPresetExtColor } = useThemeSetting();

const presets = {
    Aura,
    Lara
};
const preset = ref(layoutConfig.preset);
const presetOptions = ref(Object.keys(presets));

const menuMode = ref(layoutConfig.menuMode);
const menuModeOptions = ref([
    { label: 'Static', value: 'static' },
    { label: 'Overlay', value: 'overlay' }
]);

function getPresetExt() {
    const color = primaryColors.value.find((c) => c.name === layoutConfig.primary);
    return getPresetExtColor(color);
}

function updateColors(type, color) {
    if (type === 'primary') {
        setPrimary(color.name);
    } else if (type === 'surface') {
        setSurface(color.name);
    }

    applyTheme(type, color);
}

function applyTheme(type, color) {
    if (type === 'primary') {
        updatePreset(getPresetExt());
    } else if (type === 'surface') {
        updateSurfacePalette(color.palette);
    }
}

function onPresetChange() {
    setPreset(preset.value);
    const presetValue = presets[preset.value];
    const surfacePalette = surfaces.value.find((s) => s.name === layoutConfig.surface)?.palette;

    $t().preset(presetValue).preset(getPresetExt()).surfacePalette(surfacePalette).use({ useDefaultOptions: true });
}

function onMenuModeChange() {
    setMenuMode(menuMode.value);
}
</script>

<template>
    <div
        class="config-panel hidden absolute top-[3.25rem] right-0 w-64 p-4 bg-surface-0 dark:bg-surface-900 border border-surface rounded-border origin-top shadow-[0px_3px_5px_rgba(0,0,0,0.02),0px_0px_2px_rgba(0,0,0,0.05),0px_1px_4px_rgba(0,0,0,0.08)]"
    >
        <div class="flex flex-col gap-4">
            <div>
                <span class="text-sm text-muted-color font-semibold">{{ $tt('appConfig.label.preset-color') }}</span>
                <div class="pt-2 flex gap-2 flex-wrap justify-between">
                    <button
                        v-for="primaryColor of primaryColors"
                        :key="primaryColor.name"
                        :class="['border-none w-5 h-5 rounded-full p-0 cursor-pointer outline-none outline-offset-1', { 'outline-primary': layoutConfig.primary === primaryColor.name }]"
                        :style="{ backgroundColor: `${primaryColor.name === 'noir' ? 'var(--text-color)' : primaryColor.palette['500']}` }"
                        :title="primaryColor.name"
                        type="button"
                        @click="updateColors('primary', primaryColor)"
                    ></button>
                </div>
            </div>
            <div>
                <span class="text-sm text-muted-color font-semibold">{{ $tt('appConfig.label.surface-color') }}</span>
                <div class="pt-2 flex gap-2 flex-wrap justify-between">
                    <button
                        v-for="surface of surfaces"
                        :key="surface.name"
                        :class="[
                            'border-none w-5 h-5 rounded-full p-0 cursor-pointer outline-none outline-offset-1',
                            { 'outline-primary': layoutConfig.surface ? layoutConfig.surface === surface.name : isDarkTheme ? surface.name === 'zinc' : surface.name === 'slate' }
                        ]"
                        :style="{ backgroundColor: `${surface.palette['500']}` }"
                        :title="surface.name"
                        type="button"
                        @click="updateColors('surface', surface)"
                    ></button>
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <span class="text-sm text-muted-color font-semibold">{{ $tt('appConfig.label.theme') }}</span>
                <SelectButton v-model="preset" :allowEmpty="false" :options="presetOptions" @change="onPresetChange" />
            </div>
            <div v-if="props.showMenuMode" class="flex flex-col gap-2">
                <span class="text-sm text-muted-color font-semibold">{{ $tt('appConfig.label.menu-mode') }}</span>
                <SelectButton v-model="menuMode" :allowEmpty="false" :options="menuModeOptions" optionLabel="label" optionValue="value" @change="onMenuModeChange" />
            </div>
        </div>
    </div>
</template>
