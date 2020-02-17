export default {
	methods: {
		initialPage(totalElements) {
		  this.totalElements = totalElements;
		},
		initialParamList(list) {
		  this.paramList.splice(0);
		  list.forEach(value => {
		    this.paramList.push(value);
		  });
		},
		getParamList(page, size) {
		  this.$http_normal({
		    url: `/api/productAttr/page?page=${page - 1}&size=${
		      size
		      }&sort=id,desc${this.searchVal ? `&name=${this.searchVal}` : ""}`,
		    method: "get"
		  }).then(result => {
		    const data = result.data;
		    this.initialPage(data.totalElements);
		    this.initialParamList(data.content);
		  });
		},
		deleteAllParam() {
			if (this.selectList.length == 0) {
			  this.$warnMsg("请勾选商品参数进行批量删除")
			  return
			}
			this.$showMsgBox({
			  msg: `<p>是否删除选中商品参数?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/productAttr/del`,
			    method: "post",
			    data: this.selectList.map(val => val.id)
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.$refs.table.clearSelection()
			    this.getParamList(this.nowPage, this.nowSize)
			  });
			});
		},
		deleteParam(item) {
			this.$showMsgBox({
			  msg: `<p>是否删除选中商品参数?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/productAttr/del`,
			    method: "post",
			    data: [ item.id ]
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.$refs.table.clearSelection()
			    this.getParamList(this.nowPage, this.nowSize)
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
		// 添加商品参数
		showAddBox() {
			this.$refs.addForm.dialog = true
		},
		// 编辑商品参数
		showEditBox(item) {
			const editForm = this.$refs.editForm
			editForm.dialog = true
			editForm.form.id = item.id
      editForm.form.name = item.name
      editForm.form.value = item.value
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