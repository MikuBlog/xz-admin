import convertHttp from '@/utils/convertHttp'
export default {
	methods: {
		initialPage(totalElements) {
		  this.totalElements = totalElements;
		},
		initialApplicationList(list) {
		  this.applicationList.splice(0);
		  list.forEach(value => {
				value.logo = value.logo
				? convertHttp(value.logo)
				: ''
		    this.applicationList.push(value);
		  });
		},
		getApplicationList(page, size) {
		  this.$http_normal({
		    url: `/api/wxConfig/page?page=${page - 1}&size=${
		      size
		      }&sort=id,desc${this.selectType !== '' ? `&type=${this.selectType}` : ""}`,
		    method: "get"
		  }).then(result => {
		    const data = result.data;
		    this.initialPage(data.totalElements);
		    this.initialApplicationList(data.content);
		  });
		},
		deleteAllApplication() {
			if (this.selectList.length == 0) {
			  this.$warnMsg("请勾选应用进行批量删除")
			  return
			}
			this.$showMsgBox({
			  msg: `<p>是否删除选中应用?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/wxConfig/del`,
			    method: "post",
			    data: this.selectList.map(val => val.id)
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.getApplicationList(this.nowPage, this.nowSize)
			  });
			});
		},
		deleteApplication(item) {
			this.$showMsgBox({
			  msg: `<p>是否删除选中应用?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/wxConfig/del`,
			    method: "post",
			    data: [ item.id ]
			  }).then(() => {
			    this.$successMsg("删除成功");
					this.getApplicationList(this.nowPage, this.nowSize)
			  });
			});
		},
		getRowKey(row) {
		  return row.id;
		},
		handleSelectionChange(val) {
		  this.selectList = val;
		},
		toAddApplicationPage() {
			this.$router.push({ path: "/home/add_application" })
		},
		toEditApplicationPage(item) {
			this.$router.push({ path: `/home/edit_application?id=${item.id}` })
		},
		refresh() {
		  this.selectType = ""
		  this.$refs.pagination.toFirstPage()
		},
		// 点击搜索
		getType() {
		  this.$refs.pagination.toFirstPage()
		}
	}
}