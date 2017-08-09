import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/store'
import * as types from './store/types'

import DashView from './components/Dash'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import PostListView from './components/views/posts/List.vue'
import PostEditView from './components/views/posts/Edit.vue'

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
        path: '/dashboard',
        alias: '',
        component: DashboardView,
        meta: {description: 'Overview of environment'}
      }, {
        path: '/posts',
        component: PostListView,
        meta: { description: 'Show post list' }
      }, {
        path: '/posts/:id',
        component: PostEditView,
        meta: { description: 'Edit post' }
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
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
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
