import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import menu from './modules/menu'
import tags from './modules/tags'
import setting from './modules/setting'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    menu,
    tags,
    setting
  }
})
