export default {
	data() {
		return {
      date: "",
      dateArray: [],
			searchVal: "",
			selectType: "",
			selectList: [],
			list: [],
			isShow: false,
			url: "",
			// 当前页数
			nowPage: 1,
			// 当前页条数
			nowSize: 10,
			// 总条数
			totalElements: 0,
			buttonOptions: [{
			  type: "primary",
			  icons: 'el-icon-plus',
			  title: "添加拼团产品",
			  method: "toAddCombinationPage"
			}, {
				type: "danger",
				icons: "el-icon-delete",
				title: "批量删除拼团产品",
				method: "deleteAllCombination"
			}]
		}
	}
}