export default {
  methods: {
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
    getOnlineUserList(page, size) {
      this.$http_normal({
        url: `/api/online?page=${page - 1}&size=${
          size
          }&sort=createdAt,desc${
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