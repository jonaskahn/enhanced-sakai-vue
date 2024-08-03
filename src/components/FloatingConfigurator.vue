<script setup>
import AppConfigurator from '@/layout/AppConfigurator.vue';
import { useLayout } from '@/layout/composables/layout';
import LangPalette from '@/components/LangPalette.vue';

const { toggleDarkMode, isDarkTheme } = useLayout();
</script>

<template>
    <div class="fixed flex gap-4 top-8 right-8">
        <button class="layout-topbar-action" type="button" @click="toggleDarkMode">
            <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
        </button>

        <div class="relative">
            <Button
                v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
                icon="pi pi-palette"
                rounded
                type="button"
            />
            <AppConfigurator />
        </div>
        <lang-palette />
    </div>
</template>
