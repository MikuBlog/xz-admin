import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入二次封装的axios
import http from '../src/plugins/http'
// 引入全局提示
import message from '../src/plugins/message'
// 引入element-ui框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 按需引入iview样式
import { Drawer } from 'iview';
import 'iview/dist/styles/iview.css';
// 引入全局样式
import './global/style.css'
import './global/icon_font/iconfont.css'
import './plugins/iconfont'
// 引入时间格式化函数
import date from '../src/plugins/form_date'
// 引入设置样式函数
import SetStyle from '../src/plugins/set_style'
/**
 * 添加axios实例
 * 1. 键值对数据请求
 * 2. json数据请求
 * 3. 文件数据请求
 */
Vue.prototype.$http_normal = http.http_normal
Vue.prototype.$http_json = http.http_json
Vue.prototype.$http_file = http.http_file
/**
 * 引入全局提示
 * @param {String} msg 成功提示
 */
Vue.prototype.$successMsg = message.successMsg
Vue.prototype.$warnMsg = message.warnMsg
Vue.prototype.$errorMsg = message.errorMsg
/**
 * 引入时间格式化函数
 * @param {String | Date} date 日期格式化
 */
Vue.prototype.$formDate = date.formDate
/**
 * 日期差(date_2 - date_1)
 * @param {String | Date} date_1
 * @param {String | Date} date_2
 */
Vue.prototype.$dateDiff = date.dateDiff
/**
 * 给元素设置样式
 * @param {DOM Object} ele DOM元素
 * @param {String} ruleName CSS属性
 * @param {String} value CSS值
 */
Vue.prototype.$setStyle = SetStyle.setStyle

// 加入element-ui组件
Vue.use(ElementUI);
// 引入iview抽屉
Vue.component('Drawer', Drawer);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
