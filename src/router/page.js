const PageSpec = {
    AUTH: {
        LOGIN: {
            path: '/auth/login',
            name: 'login',
            meta: {
                title: 'page.menu-title.auth.login',
                permissions: []
            },
            component: () => import('@/views/pages/auth/Login.vue')
        }
    },
    ACCESS: {
        NOT_FOUND: {
            path: '/pages/notfound',
            name: 'notfound',
            meta: {
                title: 'page.menu-title.page.notfound',
                permissions: []
            },
            component: () => import('@/views/pages/NotFound.vue')
        },
        DENIED: {
            path: '/auth/access',
            name: 'accessDenied',
            meta: {
                title: 'page.menu-title.page.access-denied',
                permissions: []
            },
            component: () => import('@/views/pages/auth/Access.vue')
        },
        ERROR: {
            path: '/auth/error',
            name: 'accessError',
            meta: {
                title: 'page.menu-title.page.access-error',
                permissions: []
            },
            component: () => import('@/views/pages/auth/Error.vue')
        }
    },
    APP: {
        DASHBOARD: {
            path: '/',
            name: 'dashboard',
            meta: {
                title: 'page.menu-title.detail.dashboard',
                permissions: []
            },
            component: () => import('@/views/Dashboard.vue')
        },
        LANDING: {
            path: '/landing',
            name: 'landing',
            meta: {
                title: 'page.menu-title.detail.landing',
                permissions: []
            },
            component: () => import('@/views/pages/Landing.vue')
        },
        DOCUMENT: {
            path: '/documentation',
            name: 'documentation',
            meta: {
                title: 'page.menu-title.detail.documentation',
                permissions: []
            },
            component: () => import('@/views/pages/Documentation.vue')
        },
        EMPTY: {
            path: '/pages/empty',
            name: 'empty',
            meta: {
                title: 'page.menu-title.detail.page-empty',
                permissions: []
            },
            component: () => import('@/views/pages/Empty.vue')
        },
        CRUD: {
            path: '/pages/crud',
            name: 'crud',
            meta: {
                title: 'page.menu-title.detail.page-crud',
                permissions: []
            },
            component: () => import('@/views/pages/Crud.vue')
        },
        UIKIT: {
            FORM_LAYOUT: {
                path: '/uikit/formlayout',
                name: 'formlayout',
                meta: {
                    title: 'page.menu-title.detail.uikit-formlayout',
                    permissions: []
                },
                component: () => import('@/views/uikit/FormLayout.vue')
            },
            INPUT: {
                path: '/uikit/input',
                name: 'input',
                meta: {
                    title: 'page.menu-title.detail.uikit-input',
                    permissions: []
                },
                component: () => import('@/views/uikit/InputDoc.vue')
            },
            BUTTON: {
                path: '/uikit/button',
                name: 'button',
                meta: {
                    title: 'page.menu-title.detail.uikit-button',
                    permissions: []
                },
                component: () => import('@/views/uikit/ButtonDoc.vue')
            },
            TABLE: {
                path: '/uikit/table',
                name: 'table',
                meta: {
                    title: 'page.menu-title.detail.uikit-table',
                    permissions: []
                },
                component: () => import('@/views/uikit/TableDoc.vue')
            },
            LIST: {
                path: '/uikit/list',
                name: 'list',
                meta: {
                    title: 'page.menu-title.detail.uikit-list',
                    permissions: []
                },
                component: () => import('@/views/uikit/ListDoc.vue')
            },
            TREE: {
                path: '/uikit/tree',
                name: 'tree',
                meta: {
                    title: 'page.menu-title.detail.uikit-tree',
                    permissions: []
                },
                component: () => import('@/views/uikit/TreeDoc.vue')
            },
            PANEL: {
                path: '/uikit/panel',
                name: 'panel',
                meta: {
                    title: 'page.menu-title.detail.uikit-panel',
                    permissions: []
                },
                component: () => import('@/views/uikit/PanelsDoc.vue')
            },
            OVERLAY: {
                path: '/uikit/overlay',
                name: 'overlay',
                meta: {
                    title: 'page.menu-title.detail.uikit-overlay',
                    permissions: []
                },
                component: () => import('@/views/uikit/OverlayDoc.vue')
            },
            MEDIA: {
                path: '/uikit/media',
                name: 'media',
                meta: {
                    title: 'page.menu-title.detail.uikit-media',
                    permissions: []
                },
                component: () => import('@/views/uikit/MediaDoc.vue')
            },
            MESSAGE: {
                path: '/uikit/message',
                name: 'message',
                meta: {
                    title: 'page.menu-title.detail.uikit-message',
                    permissions: []
                },
                component: () => import('@/views/uikit/MessagesDoc.vue')
            },
            FILE: {
                path: '/uikit/file',
                name: 'file',
                meta: {
                    title: 'page.menu-title.detail.uikit-file',
                    permissions: []
                },
                component: () => import('@/views/uikit/FileDoc.vue')
            },
            MENU: {
                path: '/uikit/menu',
                name: 'menu',
                meta: {
                    title: 'page.menu-title.detail.uikit-menu',
                    permissions: []
                },
                component: () => import('@/views/uikit/MenuDoc.vue')
            },
            CHARTS: {
                path: '/uikit/charts',
                name: 'charts',
                meta: {
                    title: 'page.menu-title.detail.uikit-charts',
                    permissions: []
                },
                component: () => import('@/views/uikit/ChartDoc.vue')
            },
            MISC: {
                path: '/uikit/misc',
                name: 'misc',
                meta: {
                    title: 'page.menu-title.detail.uikit-misc',
                    permissions: []
                },
                component: () => import('@/views/uikit/MiscDoc.vue')
            },
            TIMELINE: {
                path: '/uikit/timeline',
                name: 'timeline',
                meta: {
                    title: 'page.menu-title.detail.uikit-timeline',
                    permissions: []
                },
                component: () => import('@/views/uikit/TimelineDoc.vue')
            }
        },
        PAGE: {}
    }
};

export default PageSpec;
