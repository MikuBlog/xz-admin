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
    // 重置
    refresh() {
      this.searchVal = ""
      this.$refs.pagination.toFirstPage()
    },
    // 点击搜索
    search() {
      this.$refs.pagination.toFirstPage()
    },
    // 回车搜索
    searchEnter(e) {
      e.keyCode === 13
      && this.$refs.pagination.toFirstPage()
    },
		// 预览代码
		previewCode(item) {
			this.$http_json({
				url: `/api/generator/handle/${item.tableName}/1`,
				method: "post"
			}).then(result => {
				console.log(result.data)
			})
		},
		// 下载代码
		downloadCode(item) {
			this.$http_json({
				url: `/api/generator/handle/${item.tableName}/2`,
				responseType: 'blob',
				method: "post"
			}).then(result => {
				const a = document.createElement('a')
				a.href = window.URL.createObjectURL(result.data)
				a.click()
			})
		},
		// 生成代码
		generateCode(item) {
			this.$http_json({
				url: `/api/generator/handle/${item.tableName}/0`,
				method: "post"
			}).then(result => {
				this.$successMsg("生成代码成功")
			})
		}
  }
}