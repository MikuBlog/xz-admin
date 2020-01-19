export default {
  data() {
    return {
      searchVal: "",
      dialogVisible: false,
      isShowButton: false,
      // 当前页数
      nowPage: 1,
      // 当前页条数
      nowSize: 10,
      // 总条数
      totalElements: 0,
      selectImageList: [],
      pictureList: [],
      idList: [],
      isShow: false,
      url: "https://myinterface.xuanzai.top/getPicture",
      buttonOptions: [{
        type: "primary",
        icons: 'el-icon-upload',
        title: "上传图片",
        method: "uploadPic"
      }, {
        type: "warning",
        icons: 'el-icon-download',
        title: "批量导出图片",
        method: "exportImage"
      }, {
        type: "danger",
        icons: 'el-icon-delete',
        title: "批量删除",
        method: "deleteAll"
      }]
    }
  }
}