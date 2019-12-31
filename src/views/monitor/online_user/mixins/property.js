export default {
  data() {
    return {
      searchVal: "",
      onlineUserList: [],
      selectList: [],
      // 当前页数
      nowPage: 1,
      // 当前页条数
      nowSize: 10,
      // 总条数
      totalElements: 0,
      buttonOptions: [{
        type: "primary",
        icons: 'el-icon-develop',
        title: "批量踢出",
        method: "kickOutAll"
      }, {
        type: "warning",
        icons: 'el-icon-download',
        title: "导出用户列表",
        method: "downloadUserList"
      }]
    }
  }
}