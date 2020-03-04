export default {
	methods: {
		// 分页处理
		initialPage(totalElements) {
		  this.totalElements = totalElements;
		},
		// 初始化资讯列表
		initialBillList(list) {
		  this.billList.splice(0);
		  list.forEach(value => {
		    this.billList.push(value);
		  });
		},
		// 获取资讯列表
		getBillList(page, size) {
		  this.$http_normal({
		    url: `/api/userBill/page?page=${page - 1}&size=${
		      size
		      }&sort=createTime,desc${this.searchVal ? `&nickname=${this.searchVal}` : ""}${this.category ? `&category=${this.category}` : ''}${this.type ? `&type=${this.type}` : ''}`,
		    method: "get"
		  }).then(result => {
		    const data = result.data;
		    this.initialPage(data.totalElements);
		    this.initialBillList(data.content);
		  });
		},
		// deleteAllArticle() {
		// 	if (this.selectList.length == 0) {
		// 	  this.$warnMsg("请勾选资讯进行批量删除")
		// 	  return
		// 	}
		// 	this.$showMsgBox({
		// 	  msg: `<p>是否删除选中资讯?</p>`,
		// 	  isHTML: true
		// 	}).then(() => {
		// 	  this.$http_json({
		// 	    url: `/api/shop/article/del`,
		// 	    method: "post",
		// 	    data: this.selectList.map(val => val.id)
		// 	  }).then(() => {
		// 	    this.$successMsg("删除成功");
		// 	    this.$refs.table.clearSelection()
		// 	    this.getBillList(this.nowPage, this.nowSize)
		// 	  });
		// 	});
		// },
		// // 删除资讯
		// deleteArticle(item) {
		// 	this.$showMsgBox({
		// 	  msg: `<p>是否删除选中资讯?</p>`,
		// 	  isHTML: true
		// 	}).then(() => {
		// 	  this.$http_json({
		// 	    url: `/api/shop/article/del`,
		// 	    method: "post",
		// 	    data: [ item.id ]
		// 	  }).then(() => {
		// 	    this.$successMsg("删除成功");
		// 	    this.$refs.table.clearSelection()
		// 			this.getBillList(this.nowPage, this.nowSize)
		// 	  });
		// 	});
		// },
		getRowKey(row) {
		  return row.id;
		},
		handleSelectionChange(val) {
		  this.selectList = val;
		},
		// // 添加资讯
		// toAddArticlePage() {
		// 	this.$router.push({ path: "/home/add_article" })
		// },
		// // 编辑资讯
		// toEditArticlePage(item) {
		// 	this.$router.push({ path: `/home/edit_article?id=${item.id}` })
		// },
		// 重置
		refresh() {
      this.nickname = ""
      this.category = ""
      this.type = ""
		  this.$refs.pagination.toFirstPage()
		},
		// 点击搜索
		search() {
		  this.$refs.pagination.toFirstPage()
		}
	}
}