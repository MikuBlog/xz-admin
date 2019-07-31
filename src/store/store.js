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
    menuList: [],
    // 保存菜单索引
    menuIndex: "首页",
    // 保存标签页列表
    tagsList: [{
      meta: {
        title: "首页",
        active: true
      },
      path: '/home/welcome',
    }]
  },
  mutations: {
    setUserInfo(state, obj) {
      for(let key in obj)
        state.user[key] = obj[key]
    },
    setMenuList(state, obj) {
      state.menuList = obj
    },
    setMenuIndex(state, index) {
      state.menuIndex = index
    },
    addTags(state, tags) {
      state.tagsList.push(tags)
    },
    removeTag(state) {
      state.tagsList.splice(1)
    }
  },
  actions: {

  }
})
