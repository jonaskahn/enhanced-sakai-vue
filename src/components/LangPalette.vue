<script setup>
import LocaleService from '@/service/LocaleService';
import { reactive } from 'vue';

const items = reactive(LocaleService.SUPPORTED_LOCALES);

const changeLanguage = (selected) => {
    LocaleService.INSTANCE.setCurrentLocale(selected);
};
</script>

<template>
    <div>
        <Menu :model="items" class="lang-menu">
            <template #item="{ item, props }">
                <a v-ripple class="flex items-center" v-bind="props.action" @click="changeLanguage(item.value)">
                    <i :class="item.icon" />
                    <span>{{ item.label }}</span>
                </a>
            </template>
        </Menu>
    </div>
</template>

<style lang="scss" scoped>
:deep(.lang-menu) {
    border: none !important;
}
</style>
