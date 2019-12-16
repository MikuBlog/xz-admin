import router from './router'
import Http from '@/api/http'
import store from '@/store'
import Storage from '@/api/storage'
// 引入进度条插件
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// 后台管理页面模板
import Layout from '@/views/Layout/index.vue'
// 默认路由页，用来存放子路由的纯路由页面
import DefaultPage from '@/Layout/index.vue'

const 
  Error = () => import('@/views/error/500'),
  Permission = () => import('@/views/error/403'),
  Redirect = () => import('@/views/redirect/index'),
  Welcome = () => import('@/views/welcome/index.vue')

// 默认后台管理模板
const layout = {
  name: 'home',
  path: '/home',
  component: Layout,
  children: [{
    name: "首页",
    path: "welcome",
    meta: {
      title: "首页"
    },
    component: Welcome
  }, {
    name: '重定向',
    meta: {
      title: "重定向"
    },
    path: 'redirect',
    component: Redirect
  }, {
    name: '403',
    meta: {
      title: "403"
    },
    path: '403',
    component: Permission
  }, {
    name: '500',
    meta: {
      title: "500"
    },
    path: '500',
    component: Error
  }]
}

// 动态生成路由
function generateRouter(list, pre, now) {
  // 如果含有重定向（含有子菜单），则继续遍历添加
  if (now && now.redirect) {
    let options = {
      path: now.path || "/",
      name: now.meta.title,
      component: DefaultPage,
      meta: now.meta,
      redirect: now.redirect,
      children: []
    }
    list.forEach(value => {
      value.meta.iframe = value.iframe
      // 如果子菜单存在，重新遍历
      if (value.children) {
        generateRouter(value.children, options, value)
      }
      // 如果当前的路由为父级路由，将子路由添加到父路由下
      if (!value.redirect) {
        options.children.push({
          path: value.path,
          name: value.name,
          meta: value.meta,
          component: () => {
            if (value.component === "Layout") {
              router.push({ path: "/home/404" })
            } else {
              return import(`@/views${value.component}`)
            }
          }
        })
      }
    })
    pre.children.push(options)
  } else {
    list.forEach(value => {
      // 如果子菜单存在，继续递归
      if (value.children) {
        generateRouter(value.children, pre, value)
      }
      // 将没有重定向的菜单先将入到layout路由里作为子路由，避免路由重复
      if (!value.redirect) {
        pre.children.push({
          path: value.path,
          name: value.name,
          meta: value.meta,
          component: () => {
            if (value.component === "Layout") {
              router.push({ path: "/home/404" })
            } else {
              return import(`@/views${value.component}`)
            }
          }
        })
      }
    })
  }
}

// 获取菜单与路由
function getRouter() {
  if (store.state.menu.menuList.length == 0) {
    Http.http_json({
      url: "/api/menu/build",
      method: "get"
    }).then(result => {
      const list = result.data
      store.commit("SET_MENU_LIST", list)
      generateRouter(list, layout)
      router.addRoutes([layout])
      router.addRoutes([{
        path: "*",
        redirect: "/404"
      }])
    })
  }
}

// 添加标签页
function addTags(tag) {
  const tagsList = store.state.tags.tagsList
  // 不添加标签页
  if (tag.meta.title === "500" || tag.meta.title === "404" || tag.meta.title === "403" || tag.meta.title === '重定向') {
    return
  }
  // 如果已存在标签，不添加标签
  for (let i = 0, len = tagsList.length; i < len; i++) {
    if (tagsList[i].meta.title === tag.meta.title || !tag.name) {
      return
    }
  }
  store.commit('ADD_TAGS', {
    name: tag.name,
    meta: tag.meta,
    path: tag.path
  })
}

// 清除缓存
function removeRedis() {
  store.commit("SET_MENU_LIST", [])
  store.commit("REMOVE_ALL_TAGS")
}

// 动态生成路由并做拦截
router.beforeEach((to, from, next) => {
  to.meta.title
    && (document.title = to.meta.title)
  NProgress.start()
  if (to.name === "login") {
    // 重新登录清空缓存
    removeRedis()
    next()
    return
  }
  if (Storage.getMemoryPmt('token')) {
    if (to.path === "/") {
      next({ path: '/login' })
    } else {
      // 如果菜单信息不存在（直接访问），重新拉取动态路由与菜单
      if (store.state.menu.menuList.length == 0) {
        getRouter()
      }
      addTags(to)
      next()
    }
  } else {
    console.log(to)
    // 保存重定向地址
    Storage.setMemorySes("redirect", to.fullPath)
    next({ path: "/login" })
  }
})

// 跳转路由后触发
router.afterEach((to, from) => {
  NProgress.done()
})

export default router
