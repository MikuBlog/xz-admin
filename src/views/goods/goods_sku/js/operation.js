export default {
	methods: {
		initialPage(totalElements) {
		  this.totalElements = totalElements;
		},
		initialSkuList(list) {
		  this.skuList.splice(0);
		  list.forEach(value => {
        value.value = JSON.parse(value.value)
		    this.skuList.push(value);
		  });
		},
		getSkuList(page, size) {
		  this.$http_normal({
		    url: `/api/productSpec/page?page=${page - 1}&size=${
		      size
		      }&sort=id,desc${this.searchVal ? `&name=${this.searchVal}` : ""}${this.value ? `&value=${this.value}` : ""}`,
		    method: "get"
		  }).then(result => {
        const data = result.data;
        this.$refs.table.clearSelection()
		    this.initialPage(data.totalElements);
		    this.initialSkuList(data.content);
		  });
		},
		deleteAllSku() {
			if (this.selectList.length == 0) {
			  this.$warnMsg("请勾选商品规格进行批量删除")
			  return
			}
			this.$showMsgBox({
			  msg: `<p>是否删除选中商品规格?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/productSpec/del`,
			    method: "post",
			    data: this.selectList.map(val => val.id)
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.getSkuList(this.nowPage, this.nowSize)
			  });
			});
		},
		deleteParam(item) {
			this.$showMsgBox({
			  msg: `<p>是否删除选中商品规格?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/productSpec/del`,
			    method: "post",
			    data: [ item.id ]
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.getSkuList(this.nowPage, this.nowSize)
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
		// 添加商品规格
		showAddBox() {
			this.$refs.addForm.dialog = true
		},
		// 编辑商品规格
		showEditBox(item) {
			const editForm = this.$refs.editForm
			editForm.dialog = true
			editForm.form.id = item.id
      editForm.form.name = item.name
      editForm.dynamicTags = item.value
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