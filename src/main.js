// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './components/App'
import router from './router'
import store from './stores'
import http from './http'

// css
import 'bulma/css/bulma.css'

Vue.config.productionTip = false

Vue.prototype.http = http

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  http,
  store,
  template: '<App/>',
  components: { App }
})
