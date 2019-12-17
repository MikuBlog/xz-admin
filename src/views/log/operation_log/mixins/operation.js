export default {
  methods: {
    // 点击搜索
    search() {
      this.nowPage = 1;
      this.selectType
        ? this.getOpertionLogList(1, this.nowSize)
        : this.$warnMsg("请选择搜索类型");
    },
    // 回车搜索
    searchEnter(e) {
      e.keyCode === 13 &&
        (this.selectType
          ? this.getOpertionLogList(1, this.nowSize)
          : this.$warnMsg("请选择搜索类型"));
    }
  }
}