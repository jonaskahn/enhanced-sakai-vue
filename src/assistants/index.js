import { app } from '@/main';

export function isMobileDevice() {
    return app.config.globalProperties.$isMobile();
}
