export default {
  created() {
    // 初始化页面数据
    this.getGenerateCodeList();
  },
  methods: {
    // 条数变化
    handleSizeChange(size) {
      this.nowSize = size;
      this.getGenerateCodeList();
    },
    // 页数变化
    handleCurrentChange(page) {
      this.nowPage = page;
      this.getGenerateCodeList();
    },
    // 分页处理
    initialPage(totalElements) {
      this.totalElements = totalElements;
    },
    // 初始化操作日志列表
    initialGenerateCodeList(list) {
      this.generateCodeList.splice(0);
      list.forEach(value => {
        this.generateCodeList.push(value);
      });
    },
    // 获取操作日志信息
    getGenerateCodeList() {
      this.$http_normal({
        url: `/api/generator/tables?page=${this.nowPage - 1}&size=${
          this.nowSize
        }&sort=createTime,desc${
          this.searchVal ? `&name=${this.searchVal}` : ""
        }`,
        method: "get"
      }).then(result => {
        const data = result.data;
        this.initialPage(data.totalElements);
        this.initialGenerateCodeList(data.content);
      });
    }
  }
}