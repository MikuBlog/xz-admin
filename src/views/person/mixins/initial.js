export default {
  created() {
    // 初始化页面数据
    this.getOpertionLogList();
  },
  methods: {
    // 条数变化
    handleSizeChange(size) {
      this.nowSize = size;
      this.getOpertionLogList();
    },
    // 页数变化
    handleCurrentChange(page) {
      this.nowPage = page;
      this.getOpertionLogList();
    },
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
    getOpertionLogList() {
      this.$http_normal({
        url: `/log/page/user?page=${this.nowPage - 1}&size=${
          this.nowSize
          }&sort=createTime,desc${
          this.searchVal ? `&description=${this.searchVal}` : ""
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