export default {
  methods: {
    // 重置
    refresh() {
      this.searchVal = ""
      this.selectType = ""
      this.$refs.pagination.toFirstPage()
    },
    // 点击搜索
    search() {
      this.selectType
        ? this.$refs.pagination.toFirstPage()
        : this.$warnMsg("请选择搜索类型");
    },
    // 显示具体错误信息
    showDetail(id) {
      this.$http_json({
        url: `/log/page/error/${id}`,
        method: "get"
      }).then(result => {
        const Detail = this.$refs.Detail
        Detail.dialogVisible = true;
        Detail.exceptionDetail = result.data.exception;
      });
    }
  }
}