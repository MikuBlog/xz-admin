export default {
  methods: {
    // 弹窗
    showGeneratorCodeBox(item) {
      const generatorBox = this.$refs.form
      generatorBox.dialog = true
      generatorBox.form.remark = item.remark
      generatorBox.getFormMsg()
      generatorBox.getTableList(item.tableName)
    },
    // 点击搜索
    search() {
      this.nowPage = 1;
      this.getGenerateCodeList()
    },
    // 回车搜索
    searchEnter(e) {
      this.nowPage = 1;
      e.keyCode === 13
      && this.getGenerateCodeList()
    }
  }
}