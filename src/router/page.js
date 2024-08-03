const PageSpec = {
    AUTH: {
        LOGIN: {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue'),
            title: 'page.menu-title.auth.login',
            permissions: []
        }
    }
};

export default PageSpec;
