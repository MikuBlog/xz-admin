import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入浏览器数据库
// import Database from './plugins/database/database'
//引入二次封装的axios
import Http from './plugins/http/http'
// 引入全局提示
import Message from './plugins/message/message'
// 引入element-ui框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 按需引入iview样式
import iview from 'iview';
import 'iview/dist/styles/iview.css';
// 引入全局样式
import './global/style.css'
import './global/icon_font/iconfont.css'
import './plugins/iconfont/iconfont'
// 引入时间格式化函数
import Date from './plugins/other/form_date'
// 引入设置样式函数
import SetStyle from './plugins/dom/set_style'
// 引入全屏函数
import FullScreen from './plugins/other/full_screen'
// 引入设置元素类模块
import SetClass from './plugins/dom/set_class'
// 引入存储模块
import Memory from './plugins/storage/storage'
/**
 * 浏览器数据库操作：增
 * @param {Object} data {id: 1, url: xxx} 
 * 浏览器数据库操作：改
 * @param {Object} data {id: 1, url: xxx} 
 * 浏览器数据库操作：查
 * @param {Number} id 
 */
// Vue.prototype.$insert = Database.insert
// Vue.prototype.$update = Database.update
// Vue.prototype.$find = Database.find
/**
 * 添加axios实例
 * 1. 键值对数据请求
 * 2. json数据请求
 * 3. 文件数据请求
 */
Vue.prototype.$http_normal = Http.http_normal
Vue.prototype.$http_json = Http.http_json
Vue.prototype.$http_file = Http.http_file
/**
 * 引入全局提示
 * @param {String} msg 成功提示
 */
Vue.prototype.$successMsg = Message.successMsg
Vue.prototype.$warnMsg = Message.warnMsg
Vue.prototype.$errorMsg = Message.errorMsg
/**
 * 引入全局弹框
 */
Vue.prototype.$showMsgBox = Message.showMsgBox
/**
 * 引入时间格式化函数
 * @param {String | Date} date 日期格式化
 */
Vue.prototype.$formDate = Date.formDate
/**
 * 日期差(date_2 - date_1)
 * @param {String | Date} date_1
 * @param {String | Date} date_2
 */
Vue.prototype.$dateDiff = Date.dateDiff
/**
 * 给元素设置样式
 * @param {DOM Object} ele DOM元素
 * @param {String} ruleName CSS属性
 * @param {String} value CSS值
 */
Vue.prototype.$setStyle = SetStyle.setStyle
/**
 * 设置全屏函数与取消全屏函数
 * @param {DOM Object} element DOM元素
 */
Vue.prototype.$setFullScreen = FullScreen.requestFullScreen
Vue.prototype.$cancelFullScreen = FullScreen.cancelFullScreen
/**
 * 添加与删除类
 * @param {DOM Object} element DOM元素
 * @param {String} className DOM元素
 */
Vue.prototype.$addClass = SetClass.addClass
Vue.prototype.$removeClass = SetClass.removeClass
/**
 * 获取类名
 * @param {DOM Object} element DOM元素
 */
Vue.prototype.$getClassName = SetClass.getClassName
/**
 * 设置存储值
 * @param {String} key 存储键
 * @param {String | Object | Number | Boolean} value 存储值
 * @param {Boolean} isPermanent 是否永久存储，默认为false
 */
Vue.prototype.$setMemory = Memory.setMemory
/**
 * 获取存储值
 * @param {String} key 存储值
 * @param {Boolean} isObject 是否为对象
 * @param {Boolean} isPermanent 是否获取永久存储值，默认为false
 * @return {String | Object | Number | Boolean} 返回值
 */
Vue.prototype.$getMemory = Memory.getMemory
// 加入element-ui组件
Vue.use(ElementUI);
// 引入iview组件
Vue.use(iview)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
