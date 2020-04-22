export default {
	methods: {
		initialPage(totalElements) {
		  this.totalElements = totalElements;
		},
		initialList(list) {
		  this.list.splice(0);
		  list.forEach(value => {
        value.map.id = value.id
		    this.list.push(value.map);
      });
		},
		getList(page, size) {
		  this.$http_normal({
		    url: `/api/groupData/page?page=${page - 1}&size=${
		      size
		      }&sort=sort,asc&groupName=seckill_time`,
		    method: "get"
		  }).then(result => {
        const data = result.data;
        this.$refs.table.clearSelection()
		    this.initialPage(data.totalElements);
		    this.initialList(data.content);
		  });
		},
		deleteAll() {
			if (this.selectList.length == 0) {
			  this.$warnMsg("请勾选滚动配置进行批量删除")
			  return
			}
			this.$showMsgBox({
			  msg: `<p>是否删除选中配置?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/groupData/del`,
			    method: "post",
			    data: this.selectList.map(val => val.id)
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.getList(this.nowPage, this.nowSize)
			  });
			});
		},
		deleteItem(item) {
			this.$showMsgBox({
			  msg: `<p>是否删除选中配置?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/groupData/del`,
			    method: "post",
			    data: [ item.id ]
			  }).then(() => {
			    this.$successMsg("删除成功");
					this.getList(this.nowPage, this.nowSize)
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