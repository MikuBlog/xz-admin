export default {
  methods: {
    // 分页处理
    initialPage(totalElements) {
      this.totalElements = totalElements;
    },
    // 初始化操作日志列表
    initialOpertionLogList(list) {
      this.operationLogList.splice(0);
      list.forEach(value => {
        this.operationLogList.push(value);
      });
    },
    // 获取操作日志信息
    getOpertionLogList(page, size) {
      this.$http_normal({
        url: `/log/page?page=${page - 1}&size=${size}&sort=createTime,desc${
          this.selectType ? `&${this.selectType}=${this.searchVal}` : ""
          }`,
        method: "get"
      }).then(result => {
        const data = result.data;
        this.initialPage(data.totalElements);
        this.initialOpertionLogList(data.content);
      });
    }
  }
}