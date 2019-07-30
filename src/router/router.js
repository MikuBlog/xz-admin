import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 登录页面
import Login from '@/views/login.vue'
// 404页面
import Error from '@/views/error/404.vue'

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
    component: Error
  }] 
})

export default router 