import router from './router'
import Http from '@/api/http/http'
import store from '@/store/store'
import Storage from '@/api/storage/storage'
// 引入进度条插件
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// 后台管理页面首页
import Layout from '@/views/home.vue'
import Welcome from '@/views/welcome.vue'

const layout = {
    path: '/home',
    name: 'home',
    component: Layout,
    children: [{
        path: "welcome",
        name: "首页",
        meta: {
            title: "首页"
        },
        component: Welcome
    }]
}

// 动态生成路由
function generateRouter(list) {
    list.forEach(value => {
        if(value.children) {
            generateRouter(value.children)
        }else {
            value.meta.parentId = value.parentId
            value.meta.iframe = value.iframe
            layout.children.push({
                path: value.path,
                name: value.name,
                meta: value.meta,
                component: () => import(`@/views${value.component}`)
            })
        }
    })
}

function getRouter() {
    if(store.state.menuList.length == 0) {
        Http.http_json({
            url: "/api/menu/build",
            method: "get"
        }).then(result => {
            const list = result.data
            store.commit("setMenuList", list)
            generateRouter(list)
            router.addRoutes([ layout ])
            router.addRoutes([{
                path: "*",
                redirect: "/404"
            }])
        })
    }
}

// 动态生成路由并做拦截
router.beforeEach((to, from, next) => {
    to.meta.title
    && (document.title = to.meta.title)
    NProgress.start()
    if(to.name === "login") {
        next()
    }
    if(Storage.getMemoryPmt('token')) {
        if(to.path === "/") {
            next({ path: '/login' })
        }else {
            // 如果用户信息存在，拉取动态路由与菜单
            if(store.state.user.phone) {
                getRouter()
            }
            // 如果菜单信息不存在（直接访问），重新拉取动态路由与菜单
            if(store.state.menuList.length == 0) {
                getRouter()
            }
            next()
        }
    }else {
        next({ path: "/login" })
    }
})
  
// 跳转路由后触发
router.afterEach((to, from) => {
    NProgress.done()
})

export default router
