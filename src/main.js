import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import 'lib-flexible'

import '@/css/index.scss'

import axios from 'axios'
Vue.prototype.$axios = axios

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


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
