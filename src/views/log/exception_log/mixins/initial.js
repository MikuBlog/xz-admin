export default {
  methods: {
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
    getExceptionLogList(page, size) {
      this.$http_normal({
        url: `/log/page/error?page=${page - 1}&size=${size}&sort=createTime,desc${
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