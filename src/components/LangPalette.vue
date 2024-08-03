<script setup>
import { reactive, ref } from 'vue';
import { getCurrentLocale, LOCALE_OPTIONS, switchLocale } from '@/locales';
import logger from '@/common/logger';

const locales = reactive(LOCALE_OPTIONS);
const selectObjLocale = LOCALE_OPTIONS.find((obj) => obj.value === getCurrentLocale());
const selectedLocale = ref(selectObjLocale);

const changeLanguage = (selected) => {
    if (selected.value !== getCurrentLocale()) {
        logger.debug(`Change locale to: ${selected.name}`);
        switchLocale(selected.value);
    }
};

const langPopupRef = ref();
const toggleLanguage = (event) => {
    langPopupRef.value.toggle(event);
};
</script>

<template>
    <button class="layout-topbar-action" type="button" @click="toggleLanguage">
        <i class="pi pi-globe"></i>
    </button>
    <Popover ref="langPopupRef" class="p-lang-menu">
        <Listbox v-model="selectedLocale" :options="locales" class="w-full md:w-56 l-lang-menu" listStyle="max-height:250px" optionLabel="name" @update:modelValue="changeLanguage">
            <template #option="slotProps">
                <div class="flex items-center">
                    <img :alt="slotProps.option.name" :class="`flag flag-${slotProps.option.code.toLowerCase()} mr-2`" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" style="width: 18px" />
                    <div>{{ slotProps.option.name }}</div>
                </div>
            </template>
        </Listbox>
    </Popover>
</template>

<style lang="scss"></style>
