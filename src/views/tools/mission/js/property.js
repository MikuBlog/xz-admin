export default {
  data() {
    return {
      searchVal: "",
      selectType: "",
      isAdd: false,
      missionList: [],
      // 当前页数
      nowPage: 1,
      // 当前页条数
      nowSize: 10,
      // 总条数
      totalElements: 0,
      options: [
        {
          label: "已暂停",
          value: true
        },
        {
          label: "运行中",
          value: false
        }
      ],
      buttonOptions: [{
        type: "primary",
        icons: 'el-icon-plus',
        title: "添加定时任务",
        method: "addItem"
      }, {
        type: "warning",
        icons: 'el-icon-document-copy',
        title: "查看执行日志",
        method: "showLogList"
      }]
    };
  }
}