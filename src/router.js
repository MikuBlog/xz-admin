import Vue from 'vue'
import Router from 'vue-router'
import Http from '@/api/http/http'
import Storage from '@/api/storage/storage'
// 登录页面
import Login from '@/views/login.vue'
// 后台管理页面首页
import Home from '@/views/home.vue'

/**
 * 子页面
 */
import Welcome from '@/views/welcome/welcome.vue'
import Chart from '@/views/chart/chart.vue'
import Person from '@/views/person/person.vue'

/**
 * 文章模块
 */
import AddArticle from '@/views/article/add_article.vue'
import EditArticle from '@/views/article/edit_article.vue'
import ArticleList from '@/views/article/article_list.vue'
import ArticleRecycle from '@/views/article/article_recycle.vue'

/**
 * 订单模块
 */
import AddOrder from '@/views/order/add_order.vue'
import EditOrder from '@/views/order/edit_order.vue'
import OrderList from '@/views/order/order_list.vue'
import OrderRecycle from '@/views/order/order_recycle.vue'

/**
 * 系统模块
 */
import AuthorityManage from '@/views/system/authority/index.vue'
import UserManage from '@/views/system/user/index.vue'
import RoleManage from '@/views/system/role/index.vue'
import MenuManage from '@/views/system/menu/index.vue'
import DictionaryManage from '@/views/system/dictionary/index.vue'
import StationManage from '@/views/system/station/index.vue'
import DepartmentManage from '@/views/system/department/index.vue'

/**
 * 日志模块
 */
import ExceptionLog from '@/views/monitor/exception_log.vue'
import OpertionLog from '@/views/monitor/operation_log.vue'
import AuthorityLog from '@/views/monitor/authority_log.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/login',
    name: 'login',
    component: Login
  }]
})

export default router 
  
const routes = [{
          path: "*",
          redirect: "/login"
        }, {
        path: '/home',
        name: 'home',
        component: Home,
        children: [{
          path: 'welcome',
          name: 'welcome',
          component: Welcome
        }, {
          path: 'add_article',
          name: 'add_article',
          component: AddArticle
        }, {
          path: 'edit_article',
          name: 'edit_article',
          component: EditArticle
        }, {
          path: 'article_list',
          name: 'article_list',
          component: ArticleList
        }, {
          path: 'article_recycle',
          name: 'article_recycle',
          component: ArticleRecycle
        }, {
          path: 'add_order',
          name: 'add_order',
          component: AddOrder
        }, {
          path: 'edit_order',
          name: 'edit_order',
          component: EditOrder
        }, {
          path: 'order_list',
          name: 'order_list',
          component: OrderList
        }, {
          path: 'order_recycle',
          name: 'order_recycle',
          component: OrderRecycle
        }, {
          path: 'authority_manage',
          name: 'authority_manage',
          component: AuthorityManage
        }, {
          path: 'user_manage',
          name: 'user_manage',
          component: UserManage
        }, {
          path: 'role_manage',
          name: 'role_manage',
          component: RoleManage
        }, {
          path: 'menu_manage',
          name: 'menu_manage',
          component: MenuManage
        }, {
          path: 'dictionary_manage',
          name: 'dictionary_manage',
          component: DictionaryManage
        }, {
          path: 'station_manage',
          name: 'station_manage',
          component: StationManage
        },{
          path: 'department_manage',
          name: 'department_manage',
          component: DepartmentManage
        },{
          path: 'exception_log',
          name: 'exception_log',
          component: ExceptionLog
        }, {
          path: 'operation_log',
          name: 'operation_log',
          component: OpertionLog
        }, {
          path: 'authority_log',
          name: 'authority_log',
          component: AuthorityLog
        }, {
          path: 'chart',
          name: 'chart',
          component: Chart
        }, {
          path: 'person',
          name: 'person',
          component: Person
        }]
    }]

router.addRoutes(routes)
/**
 * 判断token是否存在，不存在或过期重新登录
 * 每进入一次路由跳转之前都会先执行该函数
 * 第一行为了防止死循环，如果目标是登录页面，那就跳转到登录页面
 * 第二行判断token是否存在，如果不存在，中断当前跳转的路由，跳转到登录界面
 * 当第二行与第一行调转，如果token不存在，那么每次都会进行中断跳转，然后跳转之前又判断是否token存在，又中断跳转，导致死循环
 * 第三行如果不满足上述情况，直接进行路由的跳转
 */
// router.beforeEach((to, from, next) => {
//   to.name === 'login'
//   && next()
//   !Storage.getMemoryPmt('token')
//   && next('/login')
//   next()
// })