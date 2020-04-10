import convertHttp from '@/utils/convertHttp'
export default {
	methods: {
		initialPage(totalElements) {
		  this.totalElements = totalElements;
		},
		initialBrandList(list) {
		  this.brandList.splice(0);
		  list.forEach(value => {
        value.imageUrl = value.image
        ? convertHttp(value.image)
        : ''
		    this.brandList.push(value);
		  });
		},
		getBrandList(page, size) {
		  this.$http_normal({
		    url: `/api/productBrand/page?page=${page - 1}&size=${
		      size
		      }&sort=sort,asc${this.searchVal ? `&name=${this.searchVal}` : ""}`,
		    method: "get"
		  }).then(result => {
        const data = result.data;
        this.$refs.table.clearSelection()
		    this.initialPage(data.totalElements);
		    this.initialBrandList(data.content);
		  });
		},
		deleteAllBrand() {
			if (this.selectList.length == 0) {
			  this.$warnMsg("请勾选品牌进行批量删除")
			  return
			}
			this.$showMsgBox({
			  msg: `<p>是否删除选中品牌?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/productBrand/del`,
			    method: "post",
			    data: this.selectList.map(val => val.id)
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.getBrandList(this.nowPage, this.nowSize)
			  });
			});
		},
		deleteBrand(item) {
			this.$showMsgBox({
			  msg: `<p>是否删除选中品牌?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/productBrand/del`,
			    method: "post",
			    data: [ item.id ]
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.getBrandList(this.nowPage, this.nowSize)
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
			this.$refs.addForm.dialog = true
		},
		showEditBox(item) {
			const editForm = this.$refs.editForm
			editForm.dialog = true
			editForm.form.id = item.id
      editForm.getDetail()
		},
		refresh() {
		  this.searchVal = ""
		  this.$refs.pagination.toFirstPage()
		},
		search() {
		  this.$refs.pagination.toFirstPage()
		}
	}
}