const 
  state = {
    errorLogList: []
  },
  mutations = {
    // 设置前端错误日志
    SET_ERROR_LOG(state, obj) {
      state.errorLogList.push(obj)
    },
    // 清空前端错误日志
    REMOVE_ALL_ERROR_LOG(state) {
      state.errorLogList.splice(0)
    }
  }

export default {
  state,
  mutations
}