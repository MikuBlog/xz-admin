import convertHttp from '@/utils/convertHttp'
export default {
  created() {
    // 初始化页面数据
    this.getPictureList();
  },
  methods: {
    // 条数变化
    handleSizeChange(size) {
      this.nowSize = size;
      this.getPictureList();
    },
    // 页数变化
    handleCurrentChange(page) {
      this.nowPage = page;
      this.getPictureList();
    },
    // 分页处理
    initialPage(totalElements) {
      this.totalElements = totalElements;
    },
    // 初始化错误日志列表
    initialPictureList(list) {
      this.pictureList.splice(0);
      list.forEach(value => {
        value.url = convertHttp(value.url)
        this.pictureList.push(value);
      });
    },
    // 获取图片列表
    getPictureList() {
      this.$http_normal({
        url: `/api/picture/page?page=${this.nowPage - 1}&size=${this.nowSize}&sort=id,desc${
          this.searchVal ? `&filename=${this.searchVal}` : ""
          }`
        ,
        method: "get"
      }).then(result => {
        const data = result.data;
        this.initialPage(data.totalElements);
        this.initialPictureList(data.content);
      });
    }
  }
}