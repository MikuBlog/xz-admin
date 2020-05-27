import convertHttp from '@/utils/convertHttp'
export default {
	methods: {
		initialPage(totalElements) {
		  this.totalElements = totalElements;
		},
		initiaiList(list) {
		  this.list.splice(0);
		  list.forEach(value => {
        value.imageUrl = value.image
        ? convertHttp(value.image)
        : ''
		    this.list.push(value);
		  });
		},
		getList(page, size) {
		  this.$http_normal({
		    url: `/api/business/page?page=${page - 1}&size=${
		      size
		      }&sort=createTime,desc${this.searchVal ? `&name=${this.searchVal}` : ""}`,
		    method: "get"
		  }).then(result => {
        const data = result.data;
        this.$refs.table.clearSelection()
		    this.initialPage(data.totalElements);
		    this.initiaiList(data.content);
		  });
		},
		deleteAllBrand() {
			if (this.selectList.length == 0) {
			  this.$warnMsg("请勾选门店进行批量删除")
			  return
			}
			this.$showMsgBox({
			  msg: `<p>是否删除选中门店?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/business/del`,
			    method: "post",
			    data: this.selectList.map(val => val.id)
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.getList(this.nowPage, this.nowSize)
			  });
			});
		},
		deleteBrand(item) {
			this.$showMsgBox({
			  msg: `<p>是否删除选中门店?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/business/del`,
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
			this.$router.push({ path: "/home/add_shop" })
		},
		showEditBox(item) {
      this.$router.push({ path: `/home/edit_shop?id=${item.id}` })
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