export default {
  created() {
    // 初始化页面数据
    this.getExceptionLogList();
  },
  methods: {
    // 条数变化
    handleSizeChange(size) {
      this.nowSize = size;
      this.getExceptionLogList();
    },
    // 页数变化
    handleCurrentChange(page) {
      this.nowPage = page;
      this.getExceptionLogList();
    },
    // 分页处理
    initialPage(totalElements) {
      this.totalElements = totalElements;
    },
    // 初始化错误日志列表
    initialExceptionLogList(list) {
      this.exceptionLogList.splice(0);
      list.forEach(value => {
        this.exceptionLogList.push(value);
      });
    },
    // 获取错误日志信息
    getExceptionLogList() {
      this.$http_normal({
        url: `/log/page/error?page=${this.nowPage - 1}&size=${
          this.nowSize
          }&sort=createTime,desc${
          this.selectType ? `&${this.selectType}=${this.searchVal}` : ""
          }`,
        method: "get"
      }).then(result => {
        const data = result.data;
        this.initialPage(data.totalElements);
        this.initialExceptionLogList(data.content);
      });
    }
  }
}