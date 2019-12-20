export default {
  data() {
    return {
      searchVal: "",
      selectType_1: "",
      selectType_2: "",
      title: "",
      date: "",
      dateArray: [],
      authorityOldDetail: "",
      authorityNewDetail: "",
      dialogVisible: false,
      authorityLogList: [],
      // 当前页数
      nowPage: 1,
      // 当前页条数
      nowSize: 10,
      // 总条数
      totalElements: 0,
      options_1: [
        {
          value: "creatorName",
          label: "操作者"
        },
        {
          value: "name",
          label: "描述"
        }
      ],
      options_2: [
        {
          value: "1",
          label: "用户"
        },
        {
          value: "2",
          label: "角色"
        },
        {
          value: "3",
          label: "权限"
        },
        {
          value: "4",
          label: "部门"
        },
        {
          value: "5",
          label: "岗位"
        },
        {
          value: "6",
          label: "菜单"
        }
      ]
    };
  }
}