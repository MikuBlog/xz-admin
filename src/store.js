import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 保存分页设置项
    pageSetting: {
      pageSize: 10,
      pagerCount: 5
    }
  },
  mutations: {
    // 设置分页设置项
    setPage(state, obj) {
      state.pageSetting = obj
    }
  },
  actions: {

  }
})
