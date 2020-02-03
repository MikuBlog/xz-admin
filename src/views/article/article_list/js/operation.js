export default {
	methods: {
		// 分页处理
		initialPage(totalElements) {
		  this.totalElements = totalElements;
		},
		// 初始化资讯列表
		initialArticleList(list) {
		  this.articleList.splice(0);
		  list.forEach(value => {
		    this.articleList.push(value);
		  });
		},
		// 获取资讯列表
		getArticleList(page, size) {
		  // this.$http_normal({
		  //   url: `/api/job/page?page=${page - 1}&size=${
		  //     size
		  //     }&sort=sort,asc${this.searchVal ? `&name=${this.searchVal}` : ""}${
		  //     this.selectType.length > 0 ? `&enabled=${this.selectType}` : ""
		  //     }`,
		  //   method: "get"
		  // }).then(result => {
		  //   const data = result.data;
		  //   this.initialPage(data.totalElements);
		  //   this.initialArticleList(data.content);
		  // });
		},
		// 批量删除资讯
		deleteAllArticle() {
			if (this.selectList.length == 0) {
			  this.$warnMsg("请勾选资讯进行批量删除")
			  return
			}
			this.$showMsgBox({
			  msg: `<p>是否删除选中资讯?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/user/del`,
			    method: "post",
			    data: this.selectList.map(val => val.id)
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.$refs.table.clearSelection()
			    this.getUserList();
			  });
			});
		},
		// 删除资讯
		deleteArticle(item) {
			this.$showMsgBox({
			  msg: `<p>是否删除选中资讯?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/user/del`,
			    method: "post",
			    data: [ item.id ]
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.$refs.table.clearSelection()
			    this.getUserList();
			  });
			});
		},
		getRowKey(row) {
		  return row.id;
		},
		// 选中资讯
		handleSelectionChange(val) {
		  this.selectList = val;
		},
		// 添加资讯
		toAddArticlePage() {
			this.$router.push({ path: "/home/add_article" })
		},
		// 编辑资讯
		toEditArticlePage(item) {
			this.$router.push({ path: `/home/edit_article?id=${item.id}` })
		},
		// 重置
		refresh() {
		  this.searchVal = ""
		  this.$refs.pagination.toFirstPage()
		},
		// 点击搜索
		search() {
		  this.getArticleList();
		},
		searchEnter() {
			e.keyCode === 13 && this.getArticleList();
		}
	}
}