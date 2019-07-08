import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 保存菜单列表
    menuList: []
  },
  mutations: {
    // 设置菜单列表
    setMenuList(state, list) {
      list.forEach(value => {
        state.menuList.push(value)
      })
    }
  },
  actions: {

  }
})
