import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import { LoadingPlugin } from 'vue-loading-overlay';

import '@/assets/styles.scss';
import '@/assets/tailwind.css';
import 'vue-loading-overlay/dist/css/index.css';
import i18n from '@/locales';
import { SettingService } from '@/service/SettingService';
import VueMobileDetection from 'vue-mobile-detection';

export const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: SettingService.INSTANCE.getPresetThemeComponent(),
        options: {
            darkModeSelector: '.app-dark'
        }
    }
});

app.use(i18n);
app.config.globalProperties.$tt = i18n.global.t;

app.use(VueMobileDetection);
app.use(LoadingPlugin);
app.use(router);
app.use(ToastService);
app.use(ConfirmationService);

app.mount('#app');
