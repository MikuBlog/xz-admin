import { Loading } from 'element-ui'
export default {
  methods: {
    // 弹窗
    editGeneratorCode(item) {
			this.$router.push({
				path: `/home/generator_config?tableName=${item.tableName}`
			})
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
		// 下载代码
		downloadCode(item) {
			let loading = Loading.service({ fullscreen: true, background: "rgba(255, 255, 255, .4)", customClass: 'top-floor' })
			this.$http({
				url: `/api/generator/handle/${item.tableName}/2`,
				responseType: 'blob',
				method: "post",
				headers: {
					'Authorization': `Bearer ${this.$getMemoryPmt('token')}`
				}
			}).then(result => {
				const a = document.createElement('a')
				a.href = window.URL.createObjectURL(result.data)
				a.download = `${item.tableName}.zip`
				a.click()
				loading.close()
			}).catch(e => {
				this.$errorMsg('请先配置生成器')
				loading.close()
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