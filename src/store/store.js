import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 保存用户信息
    user: {
      avatar: "",
      createTime: "",
      dept: "",
      email: "",
      job: "",
      phone: ""
    },
    // 保存菜单项
    menuList: []
  },
  mutations: {
    setUserInfo(state, obj) {
      for(let key in obj)
        state.user[key] = obj[key]
    },
    setMenuList(state, obj) {
      state.menuList = obj
    }
  },
  actions: {

  }
})
