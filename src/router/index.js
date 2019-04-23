import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: resolve => require(['@w/home.vue'], resolve),
            meta: { deep: 1 }
        },
        {
            path: '/message',
            name: 'message',
            component: resolve => require(['@w/message.vue'], resolve),
            meta: { deep: 1 }
        },
        {
            path: '/user',
            name: 'user',
            component: resolve => require(['@w/user.vue'], resolve),
            meta: { deep: 1 }
        }
    ]
})
