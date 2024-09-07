<script setup>
import AppConfigurator from '@/layout/AppConfigurator.vue';
import { useLayout } from '@/layout/composables/layout';

const { toggleDarkMode, isDarkTheme } = useLayout();
</script>

<template>
    <div class="fixed flex gap-4 top-8 right-8">
        <Button :icon="isDarkTheme ? 'pi pi-moon' : 'pi pi-sun'" rounded severity="secondary" type="button" @click="toggleDarkMode" />
        <div class="relative">
            <Button
                v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
                icon="pi pi-palette"
                rounded
                type="button"
            />
            <AppConfigurator />
        </div>
    </div>
</template>
