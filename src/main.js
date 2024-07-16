import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';

import PrimeVue from 'primevue/config';

import '@/assets/styles.scss';
import 'vue-loading-overlay/dist/css/index.css';

import { useComponents, useCustomComponents, useDirectives, useServices } from '@/registry';

const app = createApp(App);

app.use(router);
app.use(PrimeVue, { ripple: true });

useServices(app);
useDirectives(app);
useComponents(app);
useCustomComponents(app)

app.mount('#app');
