export default {
  methods: {
    // 分页处理
    initialPage(totalElements) {
      this.totalElements = totalElements;
    },
    // 初始化缓存列表
    initialRedisList(list) {
      this.redisList.splice(0);
      list.forEach(value => {
        this.redisList.push(value);
      });
    },
    // 获取缓存信息
    getRedisList(page, size) {
      this.$http_normal({
        url: `/api/redis/page?page=${page - 1}&size=${
          size
          }&key=${this.searchVal || "*"}`,
        method: "get"
      }).then(result => {
        const data = result.data;
        this.initialPage(data.totalElements);
        this.initialRedisList(data.content);
      });
    }
  }
}