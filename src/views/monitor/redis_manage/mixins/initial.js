export default {
  created() {
    // 初始化页面数据
    this.getRedisList();
  },
  methods: {
    // 条数变化
    handleSizeChange(size) {
      this.nowSize = size;
      this.getRedisList();
    },
    // 页数变化
    handleCurrentChange(page) {
      this.nowPage = page;
      this.getRedisList();
    },
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
    getRedisList() {
      this.$http_normal({
        url: `/api/redis/page?page=${this.nowPage - 1}&size=${
          this.nowSize
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