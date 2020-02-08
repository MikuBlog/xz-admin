const 
  state = {
    cacheViews: []
  },
  mutations = {
    // 设置缓存页面列表
    SET_CACHE_VIEWS(state, arr) {
      arr.forEach(val => {
				if(val.cache) {
					const cacheName = val.path.replace(/\//g, "")
					state.cacheViews.push(cacheName)
				}
			})
    },
		// 添加缓存页面
		ADD_CACHE_VIEWS(state, tag) {
			if(tag.meta.cache) {
				state.cacheViews.push(tag.meta.cacheName)
			}
		},
		// 清除缓存页面
		DEL_CACHE_VIEWS(state, tag) {
			const index = state.cacheViews.indexOf(tag.meta.cacheName)
			if(index > -1) {
				state.cacheViews.splice(index, 1)
			}
		}
  }

export default {
  state,
  mutations
}