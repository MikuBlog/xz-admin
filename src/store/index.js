import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import menu from './modules/menu'
import tags from './modules/tags'
import global from './modules/global.js'
import setting from './modules/setting'
import breadcrumb from './modules/breadcrumb'
import cacheViews from './modules/cache_views'
import tableHeight from './modules/table'
import error from './modules/error'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    menu,
    tags,
		global,
    setting,
		breadcrumb,
		cacheViews,
		tableHeight,
    error
  }
})
