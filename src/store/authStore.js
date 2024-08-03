import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import DEFAULTS from '@/constants/app';

const useAuthStore = defineStore('authStore', () => {
    const expiration = ref();
    const permissions = ref([]);

    const isAuthenticated = computed(() => {
        return expiration.value !== null && expiration.value !== undefined && new Date().getTime() / 1000 < expiration.value;
    });

    const getPermissions = computed(() => permissions);

    function updateExpiration() {
        const time = Number(localStorage.getItem(DEFAULTS.TOKEN.EXPIRATION));
        if (!isNaN(time)) {
            expiration.value = time;
        }
    }

    function updatePermission(value) {
        permissions.value = value;
    }

    return { isAuthenticated, updateExpiration, getPermissions, updatePermission };
});

export default useAuthStore;
