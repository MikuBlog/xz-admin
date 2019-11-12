export default {
  created() {
    // 初始化页面数据
    this.getOnlineUserList();
  },
  methods: {
    // 条数变化
    handleSizeChange(size) {
      this.nowSize = size;
      this.getOnlineUserList();
    },
    // 页数变化
    handleCurrentChange(page) {
      this.nowPage = page;
      this.getOnlineUserList();
    },
    // 分页处理
    initialPage(totalElements) {
      this.totalElements = totalElements;
    },
    // 初始化操作日志列表
    initialOnlineUserList(list) {
      this.onlineUserList.splice(0);
      list.forEach(value => {
        this.onlineUserList.push(value);
      });
    },
    // 获取操作日志信息
    getOnlineUserList() {
      this.$http_normal({
        url: `/auth/online?page=${this.nowPage - 1}&size=${
          this.nowSize
          }&sort=createTime,desc${
          this.searchVal ? `&filter=${this.searchVal}` : ""
          }`,
        method: "get"
      }).then(result => {
        const data = result.data;
        this.initialPage(data.totalElements);
        this.initialOnlineUserList(data.content);
      });
    }
  }
}