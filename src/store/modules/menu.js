const 
  state = {
    menuList: []
  },
  mutations = {
    // 设置菜单
    setMenuList(state, obj) {
      state.menuList = obj
    }
  }

export default {
  state,
  mutations
}