export default {
	data() {
		return {
			searchVal: "",
			levelId: "",
      selectList: [],
      levelList: [],
			missionList: [],
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
			  title: "添加等级任务",
			  method: "showAddBox"
			}, {
				type: "danger",
				icons: "el-icon-delete",
				title: "批量删除等级任务",
				method: "deleteAllMission"
			}]
		}
	}
}