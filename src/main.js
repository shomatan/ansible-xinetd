// Import System requirements
import Vue from 'vue'
import axios from './http'

import { sync } from 'vuex-router-sync'
import VueProgressBar from 'vue-progressbar'
import router from './router'
import store from './store/store'

// Import Views - Top level
import App from './components/App.vue'

import 'va/lib/css'
import 'va/lib/script'

Vue.config.productionTip = false

Vue.prototype.axios = axios

const options = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

Vue.use(VueProgressBar, options)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  axios,
  router,
  store,
  template: '<App/>',
  components: { App }
})
