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
    }
  }
}