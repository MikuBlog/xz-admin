export default {
	data() {
		return {
			// searchVal: "",
			selectType: "",
			selectList: [],
			applicationList: [],
			isShow: false,
			url: "",
			// 当前页数
			nowPage: 1,
			// 当前页条数
			nowSize: 10,
			options: [{
				label: "公众号",
				value: 0
			}, {
				label: "小程序",
				value: 1
			}],
			// 总条数
			totalElements: 0,
			buttonOptions: [{
			  type: "primary",
			  icons: 'el-icon-plus',
			  title: "添加应用",
			  method: "toAddApplicationPage"
			}]
		}
	}
}