const
  state = {
    breadcrumbList: [{ 
			path: "/home/welcome", 
			meta: { 
				title: "首页" ,
			}
		}]
  },
  mutations = {
    // 设置面包屑
    SET_CRUMB_LIST(state, arr) {
      state.breadcrumbList.push(...arr)
    },
		// 清空面包屑
		CLEAR_CRUMB_LIST(state, obj) {
			state.breadcrumbList.splice(1)
		}
  } 

export default {
  state,
  mutations
}