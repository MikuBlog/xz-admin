export default {
  data() {
    return {
      searchVal: "",
      redisList: [],
      // 当前页数
      nowPage: 1,
      // 当前页条数
      nowSize: 10,
      // 总条数
      totalElements: 0,
      dialogVisible: false,
      redisDetail: ""
    }
  }
}