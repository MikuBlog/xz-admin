export default {
  data() {
    return {
      date: "",
      dateArray: [],
      searchVal: "",
      dialogVisible: false,
      isShowButton: false,
      // 当前页数
      nowPage: 1,
      // 当前页条数
      nowSize: 10,
      // 总条数
      totalElements: 0,
      selectFileList: [],
      fileList: [],
      idList: [],
      isShow: false,
      url: "https://myinterface.xuanzai.top/getPicture",
      buttonOptions: [{
        type: "primary",
        icons: 'el-icon-upload',
        title: "上传文件",
        method: "uploadFile"
      }, {
        type: "warning",
        icons: 'el-icon-download',
        title: "批量导出文件",
        method: "exportFile"
      }, {
        type: "danger",
        icons: 'el-icon-delete',
        title: "批量删除",
        method: "deleteAll"
      }]
    }
  }
}