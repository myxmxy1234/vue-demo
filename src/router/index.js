import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/index/home'
        },
        {
            path: '/index',
            name: 'index',
            component: resolve => require(['@w/home.vue'], resolve),
            meta: { deep: 1 },
            children: [
                {
                    path: 'home',
                    component: resolve => require(['@w/home.vue'], resolve),
                    meta: { deep: 2 }
                },
                {
                    path: 'message',
                    component: resolve => require(['@w/message.vue'], resolve),
                    meta: { deep: 2 }
                },
                {
                    path: 'user',
                    component: resolve => require(['@w/user.vue'], resolve),
                    meta: { deep: 2 }
                },
            ]
        },
        {
            path: '/list',
            name: 'list',
            component: resolve => require(['@w/list.vue'], resolve),
            meta: { deep: 3 }
        }
    ]
})
