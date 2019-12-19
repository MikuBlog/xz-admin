export default {
  data() {
    return {
      searchVal: "",
      selectType: "",
      operationLogList: [],
      // 当前页数
      nowPage: 1,
      // 当前条数
      nowSize: 10,
      // 总条数
      totalElements: 0,
      options: [
        {
          value: "username",
          label: "用户名"
        },
        {
          value: "description",
          label: "描述"
        }
      ]
    };
  }
}