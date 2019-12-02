const 
  state = {
    menuList: []
  },
  mutations = {
    // 设置菜单
    SET_MENU_LIST(state, obj) {
      state.menuList = obj
    }
  }

export default {
  state,
  mutations
}