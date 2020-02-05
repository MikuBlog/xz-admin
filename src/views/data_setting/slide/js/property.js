export default {
	data() {
		return {
			searchVal: "",
			selectType: "",
			selectList: [],
			slideList: [],
			isShow: false,
			url: "",
			buttonOptions: [{
			  type: "primary",
			  icons: 'el-icon-plus',
			  title: "添加幻灯片",
			  method: "toAddArticlePage"
			}, {
				type: "danger",
				icons: "el-icon-delete",
				title: "批量删除幻灯片",
				method: "deleteAllArticle"
			}]
		}
	}
}