const
  state = {
    id: "",
    username: "",
    avatar: "",
    createTime: "",
    dept: "",
    email: "",
    job: "",
    phone: "",
    roles: []
  },
  mutations = {
    // 保存用户信息
    SET_USER_INFO(state, obj) {
      for(let key in obj)
        state[key] = obj[key]
    },
  } 

export default {
  state,
  mutations
}