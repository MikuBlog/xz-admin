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
      pictureList: [],
      idList: [],
      isShow: false,
      url: "https://myinterface.xuanzai.top/getPicture"
    }
  }
}