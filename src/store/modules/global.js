const 
  state = {
		// logo地址
    logoUrl: ""
  },
  mutations = {
    // 设置logo地址
    SET_LOGO_URL(state, url) {
      state.logoUrl = url
    }
  }

export default {
  state,
  mutations
}