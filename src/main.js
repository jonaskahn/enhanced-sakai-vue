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
import 'flag-icons/css/flag-icons.min.css';

import Lara from '@primevue/themes/lara';

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Lara,
        options: {
            darkModeSelector: '.app-dark'
        }
    }
});

app.use(LoadingPlugin);
app.use(router);
app.use(ToastService);
app.use(ConfirmationService);

app.mount('#app');
