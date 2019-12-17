export default {
  data() {
    return {
      searchVal: "",
      selectType: "",
      stationList: [],
      dicts: [],
      isAdd: true,
      // 当前页条数
      nowSize: 10,
      // 总条数
      totalElements: 0,
      options: [
        {
          value: "true",
          label: "正常"
        },
        {
          value: "false",
          label: "禁用"
        }
      ],
      buttonOptions: [{
        type: "primary",
        icons: 'el-icon-plus',
        title: "添加岗位",
        method: "showAddStation"
      }]
    };
  }
}