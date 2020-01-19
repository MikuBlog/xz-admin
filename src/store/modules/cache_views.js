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
    }
  }

export default {
  state,
  mutations
}