import { createWebHistory, createRouter } from 'vue-router';

const routes = [
    {
        path: '/:pathMatch(.*)',
        name: 'NotFound',
        component: () => import('../views/ErrorView.vue'),
        meta: {
            title: '找不到页面',
            breadcrumb: '找不到页面',
        },
    },
    {
        path: '/unauthorized',
        name: 'Unauthorized',
        component: () => import('../views/ErrorView.vue'),
        meta: {
            breadcrumb: '未授权的访问',
            title: '未授权的访问',
        }
    },
    {
        path: '/serverError',
        name: 'ServerError',
        component: () => import('../views/ErrorView.vue'),
        meta: {
            breadcrumb: '服务器错误',
            title: '服务器错误',
        }
    },
    {
        path: '/',
        redirect: '/start'
    },
    {
        path: '/start',
        name: 'StartView',
        component: () => import('../views/StartView.vue'),
        meta: {
            title: '起始页',
            breadcrumb: '起始页',
        },
    },
    {
        path: '/register',
        name: 'RegisterView',
        component: () => import('../views/RegisterView.vue'),
        meta: {
            title: '注册',
            breadcrumb: '注册',
        },
    },
    {
        path: '/privacy',
        name: 'PrivacyView',
        component: () => import('../views/PrivacyView.vue'),
        meta: {
            title: '用户协议与隐私政策',
            breadcrumb: '用户协议与隐私政策',
        },
    },
    {
        path: '/home',
        name: 'HomeView',
        component: () => import('../views/HomeView.vue'),
        meta: {
            title: '首页',
            breadcrumb: '首页',
        },
        children: [
            {
                path: 'defaultpages',
                name: 'DefaultPagesView',
                component: () => import('../views/Modules/home/defaultPages.vue'),
                meta: {
                    title: '默认页面',
                    breadcrumb: '默认页面',
                }
            },
            {
                path: 'personalinformation',
                name: 'PersonalInformationView',
                component: () => import('../views/Modules/home/PersonalInformationView.vue'),
                meta: {
                    title: '个人信息',
                    breadcrumb: '个人信息',
                },
            },
            {
                path: 'overview',
                name: 'OverviewView',
                component: () => import('../views/Modules/home/OverviewView.vue'),
                meta: {
                    title: '概览',
                    breadcrumb: '概览',
                },
            }
        ]
    },
    {
        path: '/about',
        name: 'AboutView',
        component: () => import('../views/AboutView.vue'),
        meta: {
            title: '关于我们',
            breadcrumb: '关于我们',
        },
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;