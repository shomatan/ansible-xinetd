// Import System requirements
import Vue from 'vue'
import axios from './http'

import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store/store'

// Import Views - Top level
import App from './components/App.vue'

import 'va/lib/css'
import 'va/lib/script'

Vue.config.productionTip = false

Vue.prototype.axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  axios,
  router,
  store,
  template: '<App/>',
  components: { App }
})
