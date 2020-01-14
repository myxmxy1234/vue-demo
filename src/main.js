import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import 'lib-flexible'
import vcolorpicker from 'vcolorpicker'
Vue.use(vcolorpicker)


import '@/css/index.scss'

import axios from 'axios'
Vue.prototype.$axios = axios

import plugin from '@/plugins'
Vue.use(plugin)

Vue.filter('formatTime', function(time) {
    let date, year, month, day;
    if(!time) {
      date = new Date;
      year = date.getFullYear()
      month = 12;
      day = 31;
    }else{
      date = new Date(time);
      year = date.getFullYear();
      month = date.getMonth() + 1;
      day = date.getDate();
      month = month < 10 ? '0' + month : month
      day = day < 10 ? '0' + day : day
    }
    
    return `${year}.${month}.${day}`
})

const history = window.sessionStorage
history.clear()
let historyCount = +history.getItem('count') || 0
history.setItem('/', 0)

router.beforeEach((to, from, next) => {
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if(toIndex) {
    if(!fromIndex || +toIndex > +fromIndex) {
      store.commit('updateDirection', {'direction': 'forward'})
    }else {
      store.commit('updateDirection', {'direction': 'reverse'})
    }
  }else{
    historyCount++
    history.setItem('count',historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {'direction': 'forward'})
  }
  next()
})


Vue.config.productionTip = false

Vue.prototype.serverUrl = 'haha'

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

