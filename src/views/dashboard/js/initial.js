export default {
	created() {
		// this.getChartData()
		// this.getVisitData()
	},
	methods: {
		// 获取访问记录统计表
		getChartData() {
			this.$http_json({
				url: "/api/visit/chartData",
				method: "get"
			}).then(result => {
				console.log(result.data)
			})
		},
		// 获取访问记录
		getVisitData() {
			this.$http_json({
				url: "/api/visit/get",
				method: "get"
			}).then(result => {
				console.log(result)
			})
		}
	},
}