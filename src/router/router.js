import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const 
  Login = () => import('@/views/login/template_1'),
  NotFound = () => import('@/views/error/404')

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
    component: NotFound
  }] 
})

export default router 