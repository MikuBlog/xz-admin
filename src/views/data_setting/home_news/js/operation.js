export default {
	methods: {
		initialPage(totalElements) {
		  this.totalElements = totalElements;
		},
		initialNewsLlist(list) {
		  this.newsList.splice(0);
		  list.forEach(value => {
				value.value = JSON.parse(value.value)
				Object
					.keys(value.value)
					.forEach(val => {
						if(val !== 'id') {
							value[val] = value.value[val]
						}
					})
		    this.newsList.push(value);
		  });
		},
		getNewsList(page, size) {
		  this.$http_normal({
		    url: `/api/groupData/page?page=${page - 1}&size=${
		      size
		      }&sort=sort,asc&groupName=routine_home_roll_news${this.searchVal ? `&value=${this.searchVal}` : ""}`,
		    method: "get"
		  }).then(result => {
		    const data = result.data;
		    this.initialPage(data.totalElements);
		    this.initialNewsLlist(data.content);
		  });
		},
		deleteAllNews() {
			if (this.selectList.length == 0) {
			  this.$warnMsg("请勾选滚动新闻进行批量删除")
			  return
			}
			this.$showMsgBox({
			  msg: `<p>是否删除选中新闻?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/groupData/del`,
			    method: "post",
			    data: this.selectList.map(val => val.id)
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.$refs.table.clearSelection()
			    this.getNewsList(this.nowPage, this.nowSize)
			  });
			});
		},
		deleteNews(item) {
			this.$showMsgBox({
			  msg: `<p>是否删除选中新闻?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/groupData/del`,
			    method: "post",
			    data: [ item.id ]
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.$refs.table.clearSelection()
					this.getNewsList(this.nowPage, this.nowSize)
			  });
			});
		},
		getRowKey(row) {
		  return row.id;
		},
		handleSelectionChange(val) {
		  this.selectList = val;
		},
		showAddBox() {
			const form = this.$refs.form
			form.dialog = true
			form.isAdd = true
		},
		showEditBox(item) {
			const form = this.$refs.form
			form.form.id = item.id
			form.getDetail()
			form.dialog = true
			form.isAdd = false
		},
		// 重置
		refresh() {
		  this.searchVal = ""
		  this.$refs.pagination.toFirstPage()
		},
		// 点击搜索
		search() {
		  this.$refs.pagination.toFirstPage()
		}
	}
}