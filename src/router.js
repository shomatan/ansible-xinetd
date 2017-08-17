import Vue from 'vue'
import Router from 'vue-router'
import stores from './stores'
import * as types from './stores/types'

import Hello from './components/Hello.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

import PostListView from './components/views/posts/List.vue'
import PostCreateView from './components/views/posts/Create.vue'

Vue.use(Router)

const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/',
    name: 'Hello',
    component: Hello,
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: '/posts',
        component: PostListView,
        meta: { description: 'Show post list' }
      }, {
        path: '/posts/create',
        component: PostCreateView,
        meta: { description: 'Create new post' }
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

if (window.localStorage.getItem('token')) {
    stores.commit(types.LOGIN, window.localStorage.getItem('token'))
}

const router = new Router({
  routes: routes,
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (stores.state.token) {
      next()
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  }
  else {
    next()
  }
})

export default router
