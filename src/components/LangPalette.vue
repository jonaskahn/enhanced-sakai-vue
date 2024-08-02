<script setup>
import { reactive, ref } from 'vue';
import { getCurrentLocale, LOCALE_OPTIONS, switchLocale } from '@/locales';

const locales = reactive(LOCALE_OPTIONS);
const selectObjLocale = LOCALE_OPTIONS.find((obj) => obj.value === getCurrentLocale());
const selectedLocale = ref(selectObjLocale);

const changeLanguage = (selected) => {
    switchLocale(selected.value);
};
</script>

<template>
    <div>
        <Listbox v-model="selectedLocale" :options="locales" class="w-full md:w-56 lang-menu" listStyle="max-height:250px" optionLabel="name" @update:modelValue="changeLanguage">
            <template #option="slotProps">
                <div class="flex items-center">
                    <img :alt="slotProps.option.name" :class="`flag flag-${slotProps.option.code.toLowerCase()} mr-2`" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" style="width: 18px" />
                    <div>{{ slotProps.option.name }}</div>
                </div>
            </template>
        </Listbox>
    </div>
</template>

<style lang="scss" scoped>
:deep(.lang-menu > div > ul) {
    border: none !important;
    padding: 0;
}

:deep(.p-listbox) {
    border: none !important;
}
</style>
