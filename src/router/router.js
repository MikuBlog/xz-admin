import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const 
  Login = () => import('@/views/login/index.vue'),
  Error = () => import('@/views/error/404.vue'),
  Permission = () => import('@/views/error/401.vue')

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/404',
    name: '404',
    meta: {
      title: "404"
    },
    component: Error
  }, {
    path: '/401',
    name: '401',
    meta: {
      title: "401"
    },
    component: Permission
  }] 
})

export default router 