import Vue from 'vue'
import Router from 'vue-router'
// 登录页面
import Login from './views/login.vue'
// 后台管理页面首页
import Home from './views/home.vue'

/**
 * 子页面
 */
import Welcome from './views/welcome/welcome.vue'
import AddArticle from './views/article/add_article.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [{
        path: 'welcome',
        name: 'welcome',
        component: Welcome
      },{
        path: 'add_article',
        name: 'add_article',
        component: AddArticle
      }]
    },
  ]
})
