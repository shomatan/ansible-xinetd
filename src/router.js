import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/store'
import * as types from './store/types'

import DashView from './components/Dash'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import PostsView from './components/views/Posts.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/',
    component: DashView,
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: 'dashboard',
        alias: '',
        component: DashboardView,
        name: 'Dashboard',
        meta: {description: 'Overview of environment'}
      }, {
        path: 'posts',
        component: PostsView,
        name: 'Posts',
        meta: {description: 'Simple and advance table in CoPilot'}
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

if (window.localStorage.getItem('token')) {
    store.commit(types.LOGIN, window.localStorage.getItem('token'))
}

const router = new VueRouter({
  routes: routes,
  mode: 'history',

})

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.token) {
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
    }
    else {
        next();
    }
})

export default router
