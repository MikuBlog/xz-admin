import storage from '@/api/storage'
const 
  state = {
    // 保存标签页列表
    tagsList: storage.getMemorySes('tags') || [{
      meta: {
        title: "首页"
      },
      path: '/home/welcome',
			fullPath: '/home/welcome'
    }]
  },
  mutations = {
    // 添加标签页
    ADD_TAGS(state, tag) {
			// 不添加标签页
			if (!tag.name || tag.meta.title === "500" || tag.meta.title === "404" || tag.meta.title === "403" || tag.meta.title === '重定向') {
			  return
			}
			let myTag = {
				name: tag.name,
				meta: tag.meta,
				path: tag.path,
				query: tag.query,
				fullPath: tag.fullPath
			}
			// 判断标签页是否相同,如果相同,替换掉原有标签
			for (let i = 0, len = state.tagsList.length; i < len; i++) {
			  if (state.tagsList[i].meta.title === tag.meta.title) {
					state.tagsList[i] = myTag
					return
			  }
			}
			state.tagsList.push(myTag)
      // 缓存tags
      storage.setMemorySes('tags', state.tagsList)
    },
    // 删除指定标签
    REMOVE_TAGS(state, index) {
      state.tagsList.splice(index, 1)
      // 缓存tags
      storage.setMemorySes('tags', state.tagsList)
    },
		// 移除指定范围标签
		REMOVE_RANGE_TAGS(state, obj) {
		  state.tagsList.splice(obj.startInd, obj.number)
		  // 缓存tags
		  storage.setMemorySes('tags', state.tagsList)
		},
    // 移除所有标签页
    REMOVE_ALL_TAGS(state) {
      state.tagsList.splice(1)
      // 清除tags缓存
      storage.setMemorySes('tags', "")
    }
  }

export default {
  state,
  mutations
}