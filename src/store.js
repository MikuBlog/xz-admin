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
    }
  },
  mutations: {
    setUserInfo(state, obj) {
      for(let key in obj)
        state.user[key] = obj[key]
    }
  },
  actions: {

  }
})
