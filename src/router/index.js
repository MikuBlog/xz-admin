import router from './router'
import Http from '@/api/http'
import store from '@/store'
import Storage from '@/api/storage'
// 引入进度条插件
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// 后台管理页面模板
import Layout from '@/views/Layout/index.vue'

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

// 扁平化生成路由
function generateRouter(routes, newRoutes = []) {
	routes.map(item => {
		if(item.children && item.children.length > 0) {
			generateRouter(item.children, newRoutes)
		}
		item.meta.iframe = item.iframe
		item.meta.cache = item.cache
		item.meta.id = item.id
		item.meta.parentId = item.parentId
		newRoutes.push({
			path: item.path || "/",
			name: item.name,
			meta: item.meta,
			component: () => {
				const component = import(`@/views${item.component}`)
				component.then(result => {
					const aliasName = item.path.replace(/\//g, "")
					result.default.name = aliasName
				})
				return component
			}
		})
	})
	return newRoutes
}

// 扁平化列表
function flatList(list) {
	let allList = []
	for(let i = 0, len = list.length; i < len; i ++) {
		allList.push(list[i])
		if(list[i].children && list[i].children.length > 0) {
			allList = allList.concat(flatList(list[i].children))
		}
	}
	return allList
}

// 生成面包屑
function generateBreadcrumb(route, list) {
	let breadcrumbList = []
	if(route.meta.title === '首页') return
	breadcrumbList.unshift(route)
	for(let i = 0, len = list.length; i < len; i ++) {
		if(list[i].id === (route.meta.parentId || route.parentId)) {
			breadcrumbList.unshift(...generateBreadcrumb(list[i], list))
		}
	}
	return breadcrumbList
}

// 获取菜单与路由
function getData() {
  if (store.state.menu.menuList.length == 0) {
    Http.http_json({
      url: "/api/menu/build",
      method: "get"
    }).then(result => {
      const list = result.data
      store.commit("SET_MENU_LIST", list) 
			store.commit("SET_CACHE_VIEWS", flatList(list))
			layout.children.push(...generateRouter(list))
      router.addRoutes([layout])
      router.addRoutes([{
        path: "*",
        redirect: "/404"
      }])
    })
  }
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
  // 如果直接输入域名,重定向到登录界面
  if(to.path === '/') {
  	next({ path: '/login' })
		return
  }
  if (Storage.getMemoryPmt('token')) {
    if (to.path === "/") {
      next({ path: '/login' })
    } else {
      // 如果菜单信息不存在（直接访问），重新拉取动态路由与菜单
      if (store.state.menu.menuList.length == 0) {
        getData()
      }
			// 添加标签页
			store.commit('ADD_TAGS', to)
      next()
    }
  } else {
		if(to.fullPath !== '/login') {
			Storage.setMemorySes("redirect", to.fullPath)
		}
    next({ path: "/login" })
  }
})

// 跳转路由后触发
router.afterEach((to, from) => {
  NProgress.done()
	store.commit("CLEAR_CRUMB_LIST")
	store.state.menu.menuList.length > 0 
	&& store.commit("SET_CRUMB_LIST", generateBreadcrumb(to, flatList(store.state.menu.menuList)))
})

export default router
