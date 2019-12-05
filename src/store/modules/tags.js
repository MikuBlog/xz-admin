import storage from '@/api/storage'
const 
  state = {
    // 保存标签页列表
    tagsList: storage.getMemorySes('tags') || [{
      meta: {
        title: "首页"
      },
      path: '/home/welcome',
    }]
  },
  mutations = {
    // 添加标签页
    ADD_TAGS(state, tags) {
      state.tagsList.push(tags)
      // 缓存tags
      storage.setMemorySes('tags', state.tagsList)
    },
    // 删除指定标签
    REMOVE_TAGS(state, index) {
      state.tagsList.splice(index, 1)
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