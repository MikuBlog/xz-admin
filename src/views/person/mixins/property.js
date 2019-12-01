import { mapState } from "vuex";
export default {
  data() {
    return {
      activeName: "first",
      searchVal: "",
      // 当前页数
      nowPage: 1,
      // 当前页条数
      nowSize: 10,
      // 总条数
      totalElements: 0,
      operationLogList: []
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  }
}