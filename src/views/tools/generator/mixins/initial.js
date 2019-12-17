export default {
  methods: {
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
    getGenerateCodeList(page, size) {
      this.nowSize = size
      this.$http_normal({
        url: `/api/generator/tables?page=${page - 1}&size=${
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