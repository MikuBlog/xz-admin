import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/index'
import store from '@/store/store'

console.log(router)
// 处理IE报错
import 'babel-polyfill'
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
