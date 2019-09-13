import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
/**
 * @author xuanzai
 * @description api模块初始化。在如下路径文件下引入模块即可。
 */
import '@/initial/modules'
/**
 * @author xuanzai
 * @description 全局过滤器初始化。在如下路径文件下全局注册过滤器即可。
 */
import filters from '@/initial/filter'

// 全局注册过滤器
Object
  .keys(filters)
  .forEach(key => {
    Vue.filter(key, filters[key])
  })

/**
 * @author xuanzai
 * @description 全局指令初始化。在如下路径文件下全局注册指令即可。
 */
import directives from '@/initial/directives'

// 全局注册指令
Object
  .keys(directives)
  .forEach(key => {
    Vue.directive(key, {
      inserted: directives[key],
      componentUpdated: directives[key]
    })
  })
  
/**
 * @author xuanzai
 * @description 全局注册组件。在如下路径文件下全局注册指令即可。
 */
const req = require.context('@/components', true, /\.vue$/)

// 全局注册组件
req.keys().forEach(val => {
  const component = req(val).default
  Vue.component(component.name, component)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
