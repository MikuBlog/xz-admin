export default {
	data() {
		return {
      activeName: 'null',
      searchVal: "",
      selectList: [],
      list: [],
      date: "",
      dateArray: [],
			isShow: false,
			url: "",
			// 当前页数
			nowPage: 1,
			// 当前页条数
			nowSize: 10,
			// 总条数
			totalElements: 0,
			buttonOptions: [{
				type: "danger",
				icons: "el-icon-delete",
				title: "批量删除评论",
				method: "deleteAllComment"
			}]
		}
	}
}