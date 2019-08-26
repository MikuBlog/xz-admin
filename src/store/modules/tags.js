const 
  state = {
    // 保存标签页列表
    tagsList: [{
      meta: {
        title: "首页"
      },
      path: '/home/welcome',
    }]
  },
  mutations = {
    // 添加标签页
    addTags(state, tags) {
      state.tagsList.push(tags)
    },
    // 移除所有标签页
    removeTag(state) {
      state.tagsList.splice(1)
    }
  }

export default {
  state,
  mutations
}