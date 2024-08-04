import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import page from '@/router/page';
import PageSpec from '@/router/page';
import { nextTick } from 'vue';
import { translate } from '@/locales';
import useAuthStore from '@/store/authStore';
import logger from '@/common/logger';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                page.APP.DASHBOARD,

                page.APP.UIKIT.FORM_LAYOUT,
                page.APP.UIKIT.INPUT,
                page.APP.UIKIT.BUTTON,
                page.APP.UIKIT.TABLE,
                page.APP.UIKIT.LIST,
                page.APP.UIKIT.TREE,
                page.APP.UIKIT.PANEL,
                page.APP.UIKIT.OVERLAY,
                page.APP.UIKIT.MEDIA,
                page.APP.UIKIT.MESSAGE,
                page.APP.UIKIT.FILE,
                page.APP.UIKIT.MENU,
                page.APP.UIKIT.CHARTS,
                page.APP.UIKIT.MISC,
                page.APP.UIKIT.TIMELINE,

                page.APP.DOCUMENT,
                page.APP.EMPTY,
                page.APP.DOCUMENT,
                page.APP.CRUD
            ]
        },
        page.APP.LANDING,
        page.AUTH.LOGIN,
        page.ACCESS.NOT_FOUND,
        page.ACCESS.ERROR,
        page.ACCESS.DENIED
    ]
});

const whiteListUrl = [PageSpec.ACCESS.DENIED.name, PageSpec.ACCESS.NOT_FOUND.name, PageSpec.ACCESS.ERROR.name];

router.beforeEach(async (to, from, next) => {
    if (whiteListUrl.includes(to.name)) {
        next();
    } else if (isAuthenticated()) {
        await redirectIfValid(to, from, next);
    } else {
        await redirectIfInvalid(to, from, next);
    }
});

function isAuthenticated() {
    const authStore = useAuthStore();
    logger.debug(authStore.isAuthenticated);
    return authStore.isAuthenticated;
}

async function redirectIfInvalid(to, from, next) {
    if (to.path !== PageSpec.AUTH.LOGIN.path) {
        await next({
            name: PageSpec.AUTH.LOGIN.name
        });
    } else {
        next();
    }
}

async function redirectIfValid(to, from, next) {
    if (to.name === PageSpec.AUTH.LOGIN.name) {
        await next({ name: PageSpec.APP.DASHBOARD.name });
    } else if (hasPermission(to.meta.permissions ?? [])) {
        next();
    } else {
        await next({ name: PageSpec.ACCESS.DENIED.name });
    }
}

function hasPermission(permissions) {
    const authStore = useAuthStore();
    return permissions.length === 0 || containsAny(permissions, authStore.getPermissions);
}

function containsAny(arr1, arr2) {
    return arr1.some((element) => {
        return arr2.indexOf(element) !== -1;
    });
}

router.afterEach(async (to) => {
    await nextTick(() => {
        const pageTitle = translate(to.meta.title ?? to.name.toUpperCase() + '');
        document.title = translate('page.menu-title.default') + ' - ' + pageTitle;
    });
});

export default router;
