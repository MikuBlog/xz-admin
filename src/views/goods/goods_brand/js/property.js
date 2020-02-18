export default {
	data() {
		return {
			searchVal: "",
			selectType: "",
			selectList: [],
			brandList: [],
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
			  title: "添加品牌",
			  method: "showAddBox"
			}, {
				type: "danger",
				icons: "el-icon-delete",
				title: "批量删除品牌",
				method: "deleteAllBrand"
			}]
		}
	}
}