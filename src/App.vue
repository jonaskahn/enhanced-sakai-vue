<script setup>
import { onBeforeMount } from 'vue';
import GlobalSettingService from '@/service/GlobalSettingService';

const globalSettingService = new GlobalSettingService()

onBeforeMount(() => {
    const preferredTheme = globalSettingService.getTheme()
    if (!preferredTheme) {
        return
    }
    if(preferredTheme.includes('dark') ) {
        globalSettingService.setTheme(preferredTheme);
    }
    const themeLink = document.getElementById('theme-css');
    themeLink.setAttribute('href', `/themes/${preferredTheme}/theme.css`);
})
</script>

<template>
    <router-view v-slot="{ Component }">
        <transition mode="out-in" name="slide-fade">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<style scoped></style>
