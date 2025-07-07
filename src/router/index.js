import { createWebHistory, createRouter } from 'vue-router';
// 导入请求
import { checkToken } from '../api/request';
// 导入 Cookies
// 导入工具
import { getCookie } from '../utils/index';

const routes = [
    {
        path: '/unauthorized',
        name: 'Unauthorized',
        component: () => import('../views/ErrorView.vue'),
        meta: {
            breadcrumb: '未授权的访问',
            title: '未授权的访问',
            permissions: ['admin', 'ordinary'], // 需要的权限
        }
    },
    {
        path: '/serverError',
        name: 'ServerError',
        component: () => import('../views/ErrorView.vue'),
        meta: {
            breadcrumb: '服务器错误',
            title: '服务器错误',
            permissions: ['admin', 'ordinary'],
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
            permissions: ['admin', 'ordinary'],
        },
    },
    {
        path: '/register',
        name: 'RegisterView',
        component: () => import('../views/RegisterView.vue'),
        meta: {
            title: '注册',
            breadcrumb: '注册',
            permissions: ['admin', 'ordinary'],
        },
    },
    {
        path: '/privacy',
        name: 'PrivacyView',
        component: () => import('../views/PrivacyView.vue'),
        meta: {
            title: '用户协议与隐私政策',
            breadcrumb: '用户协议与隐私政策',
            permissions: ['admin', 'ordinary'],
        },
    },
    {
        path: '/home',
        name: 'HomeView',
        component: () => import('../views/HomeView.vue'),
        meta: {
            title: '首页',
            breadcrumb: '首页',
            requiresAuth: true, // 需要验证
            permissions: ['admin', 'ordinary'],
        },
        children: [
            {
                path: 'personalinformation',
                name: 'PersonalInformationView',
                component: () => import('../views/Modules/home/PersonalInformationView.vue'),
                meta: {
                    title: '个人信息',
                    breadcrumb: '个人信息',
                    permissions: ['admin', 'ordinary'],
                },
            },
            {
                path: 'overview',
                name: 'OverviewView',
                component: () => import('../views/Modules/home/OverviewView.vue'),
                meta: {
                    title: '概览',
                    breadcrumb: '概览',
                    permissions: ['admin', 'ordinary'],
                },
            },
            {
                path: 'systemlog',
                name: 'SystemLogView',
                component: () => import('../views/Modules/home/SystemlogView.vue'),
                meta: {
                    title: '系统日志',
                    breadcrumb: '系统日志',
                    permissions: ['admin'],
                },
            },
            {
                path: 'serverstatus',
                name: 'ServerStatusView',
                component: () => import('../views/Modules/home/SystemstatusView.vue'),
                meta: {
                    title: '服务器状态',
                    breadcrumb: '服务器状态',
                    permissions: ['admin'],
                },
            },
            {
                path: 'accountManagement',
                name: 'AccountManagement',
                component: () => import('../views/Modules/system/AccountManagement.vue'),
                meta: {
                    title: '账号管理',
                    breadcrumb: '账号管理',
                    requiresAuth: true, // 需要验证
                    permissions: ['admin'], // 需要的权限
                },
            },
            {
                path: 'interviewView',
                name: 'InterviewView',
                component: () => import('../views/Modules/system/InterviewView.vue'),
                meta: {
                    title: '访问情况',
                    breadcrumb: '访问情况',
                    requiresAuth: true, // 需要验证
                    permissions: ['admin', 'ordinary'], // 需要的权限
                },
            },
            {
                path: 'environmentVariable',
                name: 'EnvironmentVariableView',
                component: () => import('../views/Modules/system/EnvironmentVariableView.vue'),
                meta: {
                    title: '修改环境变量',
                    breadcrumb: '修改环境变量',
                    requiresAuth: true, // 需要验证
                    permissions: ['admin'], // 需要的权限
                },
            }
        ]
    },
    {
        path: '/shoping',
        name: 'ShopingView',
        component: () => import('../views/ShopingView.vue'),
        meta: {
            title: '商品管理',
            breadcrumb: '商品管理',
            requiresAuth: true, // 需要验证
            permissions: ['admin', 'ordinary'], // 需要的权限
        },
        children: [
            {
                path: 'shopingAllView',
                name: 'ShopingAllView',
                component: () => import('../views/Modules/shoping/ShopingAllView.vue'),
                meta: {
                    title: '商品列表',
                    breadcrumb: '商品列表',
                    requiresAuth: true, // 需要验证
                    permissions: ['admin', 'ordinary'], // 需要的权限
                },
            },
            {
                path: 'shopingAddView',
                name: 'ShopingAddView',
                component: () => import('../views/Modules/shoping/ShopingAddView.vue'),
                meta: {
                    title: '添加商品',
                    breadcrumb: '添加商品',
                    requiresAuth: true, // 需要验证
                    permissions: ['admin', 'ordinary'], // 需要的权限
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
            permissions: ['admin', 'ordinary'],
        },
    },
    {
        path: '/:pathMatch(.*)',
        name: 'NotFound',
        component: () => import('../views/ErrorView.vue'),
        meta: {
            title: '找不到页面',
            breadcrumb: '找不到页面',
            permissions: ['admin', 'ordinary'],
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    // console.log('路由变化:', to.fullPath);
    // 检查是否需要验证
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        const token = getCookie('AUTO_TOKEN');
        // console.log('当前 token:', token);
        if (!token) {
            // 如果没有 token，重定向到登录页面
            next({ name: 'StartView' });
        } else {
            try {
                // 验证 token
                const res = await checkToken({ token });
                // console.log('Token 验证结果:', res);
                if (res.code === 200) {
                    next();
                } else {
                    // 如果验证失败，重定向到登录页面
                    next({ name: 'StartView' });
                }
            } catch (error) {
                console.error('Token 验证失败:', error);
                next({ name: 'StartView' });
            }
        }
    } else {
        next();
    }
});

export default router;