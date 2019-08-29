import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/index'
import store from '@/store/store'
/**
 * @author xuanzai
 * @description api模块初始化。在如下路径文件下引入模块即可。
 */
import '@/initial/module'
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
