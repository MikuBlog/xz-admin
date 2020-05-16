export default {
	data() {
		return {
      nickname: "",
      searchStatus: "",
      searchFeedType: "",
      selectList: [],
      commentList: [],
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
      options_1: [{
        label: "已回复",
        value: 1
      }, {
        label: "未回复",
        value: 0
      }],
      options_2: [{
        label: "遇到问题",
        value: "遇到问题"
      }, {
        label: "使用建议",
        value: "使用建议"
      }],
			buttonOptions: [{
				type: "danger",
				icons: "el-icon-delete",
				title: "批量删除评论",
				method: "deleteAllComment"
			}]
		}
	}
}