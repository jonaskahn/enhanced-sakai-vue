import { app } from '@/main';
import { translate } from '@/locales';
import DEFAULTS from '@/constants/app';
import { isMobileDevice } from '@/assistants';

export default class NotificationService {
    static INSTANCE = new NotificationService();

    async sendSuccessMessage({ title, body = 'Replace me, please !!!' }) {
        app.config.globalProperties.$toast.add({
            severity: 'success',
            summary: translate(title || 'global.notification.default-title.success'),
            detail: translate(body),
            life: DEFAULTS.TOAST_TIMEOUT.SUCCESS,
            group: isMobileDevice() ? 'mobile' : 'desktop'
        });
    }

    async sendErrorMessage({ title, body = 'Replace me, please !!!' }) {
        app.config.globalProperties.$toast.add({
            severity: 'error',
            summary: translate(title || 'global.notification.default-title.error'),
            detail: translate(body),
            life: DEFAULTS.TOAST_TIMEOUT.ERROR,
            group: isMobileDevice() ? 'mobile' : 'desktop'
        });
    }

    async sendWarnMessage({ title, body = 'Replace me, please !!!' }) {
        app.config.globalProperties.$toast.add({
            severity: 'warn',
            summary: translate(title || 'global.notification.default-title.warn'),
            detail: translate(body),
            life: DEFAULTS.TOAST_TIMEOUT.WARN,
            group: isMobileDevice() ? 'mobile' : 'desktop'
        });
    }

    async sendInfoMessage({ title, body = 'Replace me, please !!!' }) {
        app.config.globalProperties.$toast.add({
            severity: 'info',
            summary: translate(title || 'global.notification.default-title.info'),
            detail: translate(body),
            life: DEFAULTS.TOAST_TIMEOUT.INFO,
            group: isMobileDevice() ? 'mobile' : 'desktop'
        });
    }
}
