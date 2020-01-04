import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import menu from './modules/menu'
import tags from './modules/tags'
import breadcrumb from './modules/breadcrumb'
import setting from './modules/setting'
import cacheViews from './modules/cache_views'
import error from './modules/error'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    menu,
    tags,
		breadcrumb,
    setting,
		cacheViews,
    error
  }
})
