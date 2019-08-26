import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 页面元素样式设置
    setting: {
      showLogo: true,
      showTags: true,
      showBreadcrumb: true,
    },
    // 保存用户信息
    user: {
      avatar: "",
      createTime: "",
      dept: "",
      email: "",
      job: "",
      phone: "",
      roles: []
    },
    // 保存菜单项
    menuList: [],
    // 保存标签页列表
    tagsList: [{
      meta: {
        title: "首页"
      },
      path: '/home/welcome',
    }]
  },
  mutations: {
    // 保存用户信息
    setUserInfo(state, obj) {
      for(let key in obj)
        state.user[key] = obj[key]
    },
    // 设置菜单
    setMenuList(state, obj) {
      state.menuList = obj
    },
    // 添加标签页
    addTags(state, tags) {
      state.tagsList.push(tags)
    },
    // 移除所有标签页
    removeTag(state) {
      state.tagsList.splice(1)
    }
  }
})
