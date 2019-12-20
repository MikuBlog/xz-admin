export default {
  data() {
    return {
      pagination: "",
      searchVal: "",
      selectType: "",
      exceptionLogList: [],
      // 当前页数
      nowPage: 1,
      // 当前页条数
      nowSize: 10,
      // 总条数
      totalElements: 0,
      dialogVisible: false,
      exceptionDetail: "",
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