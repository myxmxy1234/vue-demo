import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/index.vue'
let _import = file => () => import('@w/' + file + '.vue');
import activityPage from '../components/activityPage.vue'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      redirect: '/index/home'
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta: {
        keepAlive: false
      },
      children: [
          {
          path: 'home',
          name: 'homeindex',
          component: _import('home'),
          title: '首页',
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'message',
          name: 'messageindex',
          component: _import('message'),
          title: '消息',
          meta: {
            keepAlive: false
          }
        },
        {
          path: 'user',
          name: 'userindex',
          component: _import('user'),
          title: '我的',
          meta: {
            keepAlive: false
          }
        }
      ]
    },
    {
      path: '/list',
      name: 'list',
      component: _import('list'),
      title: '活动列表',
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/activityPage',
      component: activityPage
    }
  ]
})
