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
    setUserInfo(state, obj) {
      for(let key in obj)
        state[key] = obj[key]
    },
  } 

export default {
  state,
  mutations
}