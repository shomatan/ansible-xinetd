import http from 'axios'
import store from '../stores'
import router from '../router'
import config from '../config'

http.defaults.timeout = 5000
http.defaults.baseURL = config.serverURI

http.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers['X-Auth-Token'] = `${store.state.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

http.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          store.commit(types.LOGOUT)
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error)
  }
)
