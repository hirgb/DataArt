import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            component: resolve => require(['@/components/Index.vue'], resolve),
        },
        {
            path: '/login',
            component: resolve => require(['@/components/Login.vue'], resolve),
        },
        {
            path: '/home',
            component: resolve => require(['@/components/home/Index.vue'], resolve),
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/stock/:code',
            component: resolve => require(['@/components/stock/Index.vue'], resolve),
            props: true,
        },
        {
            path: '/themis',
            component: resolve => require(['@/components/admin/Index.vue'], resolve),
        },
        {
            path: '/404',
            component: resolve => require(['@/components/404.vue'], resolve),
        },
        {
            path: '*',
            redirect: '/404'
        },
    ]
})
