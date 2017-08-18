// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './components/App.vue'
import router from './router.js'
import store from './stores'
import http from './http'

// css
import 'bulma/css/bulma.css'
import 'font-awesome/css/font-awesome.css'
import 'element-ui/lib/theme-default'

// element-ui
import { DatePicker } from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

Vue.config.productionTip = false

Vue.prototype.http = http

Vue.use(DatePicker)
locale.use(lang)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  http,
  store,
  template: '<App/>',
  components: { App }
})
