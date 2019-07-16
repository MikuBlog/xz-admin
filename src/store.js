import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 保存菜单列表
    menuList: [],
    // 保存分页设置项
    pageSetting: {
      pageSize: 10,
      pagerCount: 5
    }
  },
  mutations: {
    // 设置菜单列表
    setMenuList(state, list) {
      list.forEach(value => {
        state.menuList.push(value)
      })
    },
    // 设置分页设置项
    setPage(state, obj) {
      state.pageSetting = obj
    }
  },
  actions: {

  }
})
