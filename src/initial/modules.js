import Vue from 'vue'
// 引入markdown编辑器
import mavonEditor from 'mavon-editor'
// 引入导航栏折叠
import Fragment from 'vue-fragment'
// 引入图片剪裁组件
import VueCropper from 'vue-cropper'
// 引入表单生成器
import FormMaking from 'form-making'
// 引入表单生成器富文本
import VueEditor from "vue2-editor"
// 引入icon组件
import '@/icons'
// 引入UI框架
import './UI/elementUI'
import './UI/iviewUI'
// 引入全局样式
import '@/global/css/animation.css'
import '@/global/css/elementUI.css'
import '@/global/css/format.css'
import '@/global/css/media.css'
import '@/api/iconfont/iconfont'
import 'element-ui/lib/theme-chalk/index.css'
import 'iview/dist/styles/iview.css'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import 'mavon-editor/dist/css/index.css'
import 'form-making/dist/FormMaking.css'
// 引入全局提示模块
import Message from '@/api/message'
// 引入树状选择器
import Treeselect from '@riophae/vue-treeselect'
// 引入浏览器数据库模块
import Database from '@/api/database'
// 引入二次封装的axios模块
import Http from '@/api/http'
// 引入websocket模块
import Socket from '@/api/websocket'
// 引入时间格式化函数
import Date from '@/api/date'
// 引入获取URL参数函数
import UrlQuery from '@/api/other/url_query'
// 引入设置样式函数
import SetStyle from '@/api/dom/set_style'
// 引入设置元素类模块
import SetClass from '@/api/dom/set_class'
// 引入插入元素模块
import InsertAfter from '@/api/dom/insert_after'
// 引入文本复制模块
import Copy from '@/api/dom/copy'
// 引入全屏函数
import FullScreen from '@/api/other/full_screen'
// 引入存储模块
import Memory from '@/api/storage'
// 引入文件下载模块
import Download from '@/api/file/download'
// 引入打印功能
import Print from '@/api/file/print'
// 引入图片读取模块
import ReadImg from '@/api/file/get_file_image'
// 引入文件读取模块
import ReadFile from '@/api/file/get_file_image'
// 引入文件预览模块
import PreviewFile from '@/api/file/preview_file'
// 引入json美化模块
import JsonPretty from '@/api/json'
// 引入图片加载动画模块
import ImageLoad from '@/api/other/image_load'
// 引入数组模块
import ArrayMethod from '@/api/array'
// 引入客户端类型判断
import Agent from '@/api/other/agent'
// 引入控制流量模块
import control from '@/api/control'
// 引入全局配置模块
import DefaultConfig from '@/global/js/config'
/**
 * @author xuanzai
 * @description 连接数据库
 * @param {String} databaseName 数据库名称
 * @returns {Promise}
 */
Vue.prototype.$connectDatabase = Database.connectDatabase
/**
 * @author xuanzai
 * @description 创建表格
 * @param {String} tableName 表名
 * @param {Object} options 参数
 */
Vue.prototype.$createTable = Database.createTable
/**
 * @author xuanzai
 * @description 添加数据
 * @param {String} tableName 表名
 * @param {Object} data 插入的数据
 * @returns {Promise}
 */
Vue.prototype.$insert = Database.insert
/**
 * @author xuanzai
 * @description 查找数据
 * @param {String} tableName 表名
 * @param {Number} id 数据id
 * @returns {Promise}
 */
Vue.prototype.$update = Database.find
/**
 * @author xuanzai
 * @description 修改数据
 * @param {String} tableName 表名
 * @param {Number} id 数据id
 * @param {Number} data 修改数据
 * @returns {Promise}
 */
Vue.prototype.$find = Database.update
/**
 * @author xuanzai
 * @description 添加axios实例
 * 1. 键值对数据请求
 * 2. json数据请求
 * 3. 文件数据请求
 */
Vue.prototype.$http_normal = Http.http_normal
Vue.prototype.$http_json = Http.http_json
Vue.prototype.$http_file = Http.http_file
Vue.prototype.$http = Http.axios
/**
 * @author xuanzai
 * @description 创建websocket实例
 * @param {Object} option 
 * @returns {WebSocket}
 */
Vue.prototype.$createSokect = Socket
/**
 * @author xuanzai
 * @description 引入全局提示
 * @param {String} msg 提示内容
 */
Vue.prototype.$successMsg = Message.successMsg
Vue.prototype.$warnMsg = Message.warnMsg
Vue.prototype.$errorMsg = Message.errorMsg
/**
 * @author xuanzai
 * @description 引入全局通知
 * @param {String} msg 通知内容
 * @param {String} title 标题
 */
Vue.prototype.$successTip = Message.successTip
Vue.prototype.$warnTip = Message.warnTip
Vue.prototype.$errorTip = Message.errorTip
/**
 * @author xuanzai
 * @description 引入全局弹框
 * @param {String} title 标题
 * @param {String} msg 内容
 * @param {Boolean} isHTML 内容是否为html
 */
Vue.prototype.$showMsgBox = Message.showMsgBox
/**
 * @author xuanzai
 * @description 引入全局弹框
 * @param {String} title 标题
 * @param {String} msg 内容
 * @param {Boolean} isHTML 内容是否为html
 */
Vue.prototype.$showTipDiy = Message.showTipDiy
/**
 * @author xuanzai
 * @description 引入时间格式化函数
 * @param {String | Date} date 日期格式化
 */
Vue.prototype.$formatDate = Date.formatDate
/**
  * @author xuanzai
  * @description 获取url后的参数
  * @returns {Object}
  */
Vue.prototype.$urlQuery = UrlQuery
/**
 * @author xuanzai
 * @description 日期差(date_2 - date_1)
 * @param {String | Date} date_1
 * @param {String | Date} date_2
 */
Vue.prototype.$dateDiff = Date.dateDiff
/**
 * @author xuanzai
 * @description 给元素设置样式
 * @param {DOM Object} ele DOM元素
 * @param {String} ruleName CSS属性
 * @param {String} value CSS值
 */
Vue.prototype.$setStyle = SetStyle.setStyle
/**
 * @author xuanzai
 * @description 给元素设置内联样式（温馨提示：会覆盖原有样式）
 * @param {DOM Object} ele DOM元素
 * @param {String} rule CSS写法
 */
Vue.prototype.$setCssText = SetStyle.setCssText
/**
 * @author xuanzai
 * @description 设置全局样式
 * @param {String} css css代码
 * @param {String} className 类名
 */
Vue.prototype.$createStyle = SetStyle.createStyle
/**
 * @author xuanzai
 * @description 设置白昼模式
 */
Vue.prototype.$clearMode = SetStyle.clearMode
/**
 * @author xuanzai
 * @description 设置夜间模式
 * @param {Boolean} isDark 是否夜间（默认为true）
 */
Vue.prototype.$darkMode = SetStyle.darkMode
/**
 * @author xuanzai
 * @description 设置色弱模式
 * @param {Boolean} isWeakness 是否夜间（默认为true）
 */
Vue.prototype.$weaknessMode = SetStyle.weaknessMode
/**
 * @author xuanzai
 * @description 设置反转模式
 * @param {Boolean} isHueRotate 是否夜间（默认为true）
 */
Vue.prototype.$hueRotateMode = SetStyle.hueRotateMode
/**
 * @author xuanzai
 * @description 设置全屏函数与取消全屏函数
 * @param {DOM Object} element DOM元素
 */
Vue.prototype.$setFullScreen = FullScreen.requestFullScreen
Vue.prototype.$cancelFullScreen = FullScreen.cancelFullScreen
/**
 * @author xuanzai
 * @description 添加与删除类
 * @param {DOM Object} element DOM元素
 * @param {String} className DOM元素
 */
Vue.prototype.$addClass = SetClass.addClass
Vue.prototype.$removeClass = SetClass.removeClass
/**
 * @author xuanzai
 * @description 获取类名
 * @param {DOM Object} element DOM元素
 */
Vue.prototype.$getClassName = SetClass.getClassName
/**
 * @author xuanzai
 * @description 设置存储值
 * @param {String} key 存储键
 * @param {Any} value 存储值
 */
Vue.prototype.$setMemorySes = Memory.setMemorySes
Vue.prototype.$setMemoryPmt = Memory.setMemoryPmt
/**
 * @author xuanzai
 * @description 获取存储值
 * @param {String} key 存储值
 * @return {Any} 返回值
 */
Vue.prototype.$getMemorySes = Memory.getMemorySes
Vue.prototype.$getMemoryPmt = Memory.getMemoryPmt
/**
 * @author xuanzai
 * @description 清空浏览器存储的数据
 */
Vue.prototype.$clearMemorySes = Memory.clearMemorySes
Vue.prototype.$clearMemoryPmt = Memory.clearMemoryPmt
/**
 * @author xuanzai
 * @description 获取图片文件地址与文件信息
 * @param {Number} limit 限制图片大小/MB
 * @returns {Promise}
 */
Vue.prototype.$getImgFile = ReadImg.getImgFile
/**
 * @author xuanzai
 * @description 获取文件地址与文件信息
 * @param {Number} limit 限制文件大小/MB
 * @returns {Promise}
 */
Vue.prototype.$getFile = ReadFile
/**
 * @author xuanzai
 * @description 获取图片文件地址与文件信息
 * @param {String} url 文件地址
 */
Vue.prototype.$previewFile = PreviewFile
/**
 * @author xuanzai
 * @description 下载文件
 * @param {String} url 下载路径
 * @param {String} fileName 文件名称
 * @param {Boolean} isBlob 是否为二进制文件
 */
Vue.prototype.$download = Download
/**
 * @author xuanzai
 * @description 文本复制
 * @param {DOM | String} obj 要复制的内容或DOM文本节点
 * @returns {Promise}
 */
Vue.prototype.$copyText = Copy
/**
 * @author xuanzai
 * @description 插入元素
 * @param {DOM Object} newEle 新元素
 * @param {DOM Object} nowEle 旧元素
 */
Vue.prototype.$insertAfter = InsertAfter
/**
 * @author xuanzai
 * @description json美化(配合pre标签使用)
 * @param {JSON | Object} json json字符串或对象
 * @returns {JSON} 返回美化好的JSON 
 */
Vue.prototype.$jsonPretty = JsonPretty
/**
 * @author xuanzai
 * @description 图片加载模块
 * @param {String} url
 */
Vue.prototype.$imageLoad = ImageLoad
/**
 * @author xuanzai
 * @description 排序（只排字段值为数字和日期）
 * @param {Array} list 需要排序的数组
 * @param {Boolean} isDes 是否倒序
 * @param {String} property 如果排序元素为对象，可指定需要排序的字段
 * @returns {Array} 返回新的数组
 */
Vue.prototype.$sortList = ArrayMethod.sortList
/**
 * @author xuanzai
 * @description 排序
 * @param {Array} list 需要排序的数组
 * @param {Boolean} isDes 是否倒序
 * @param {String} property 如果排序元素为对象，可指定需要排序的字段
 * @returns {Array} 返回新的数组
 */
Vue.prototype.$searchResult = ArrayMethod.searchResult
/**
 * @author xuanzai
 * @description 判断设备是否为移动端
 * @returns {Boolean} 返回判断结果
 */
Vue.prototype.$isMobile = Agent.isMobile
/**
 * @author xuanzai
 * @description 判断设备是否为ipad
 * @returns {Boolean} 返回判断结果
 */
Vue.prototype.$isIpad = Agent.isIpad
/**
 * @author xuanzai
 * @description 判断是否为移动端
 * @param {HTML}
 */
Vue.prototype.$print = Print
/**
 * @author xuanzai
 * @description 防抖函数
 * @param {Function} callback 回调函数
 * @param {Number} time 单位ms
 * @param {Boolean} immediate 第一次是否调用
 * @returns {Function}
 */
Vue.prototype.$debounce = control.debounce
/**
 * @author xuanzai
 * @description 节流函数
 * @param {Function} callback 回调函数
 * @param {Number} wait 单位ms
 * @returns {Function}
 */
Vue.prototype.$throttled = control.throttled
/**
 * @author xuanzai
 * @description 全局通用配置
 */
Vue.prototype.defaultConfig = DefaultConfig
// 引入markdown编辑器组件
Vue.use(mavonEditor)
// 引入树状选择器组件
Vue.component('treeselect', Treeselect)
// 引入导航栏折叠
Vue.use(Fragment.Plugin)
// 引入图片剪裁组件
Vue.use(VueCropper)
// 引入表单生成器
Vue.use(FormMaking)
// 引入表单生成器富文本
Vue.use(VueEditor)

Vue.config.productionTip = false