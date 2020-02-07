import convertHttp from '@/utils/convertHttp'
export default {
	methods: {
		initialPage(totalElements) {
		  this.totalElements = totalElements;
		},
		initialPayList(list) {
		  this.articleList.splice(0);
		  list.forEach(value => {
				value.coverImage = convertHttp(value.coverImage)
		    this.articleList.push(value);
		  });
		},
		getPayList(page, size) {
		  this.$http_normal({
		    url: `/api/wxPayConfig/page`,
		    method: "get"
		  }).then(result => {
		    const data = result.data;
		    this.initialPage(data.totalElements);
		    this.initialPayList(data.content);
		  });
		},
		deleteAllPay() {
			if (this.selectList.length == 0) {
			  this.$warnMsg("请勾选支付配置进行批量删除")
			  return
			}
			this.$showMsgBox({
			  msg: `<p>是否删除选中支付配置?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/wxPayConfig/del`,
			    method: "post",
			    data: this.selectList.map(val => val.id)
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.$refs.table.clearSelection()
			    this.getPayList(this.nowPage, this.nowSize)
			  });
			});
		},
		// 删除资讯
		deletePay(item) {
			this.$showMsgBox({
			  msg: `<p>是否删除选中支付配置?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/wxPayConfig/del`,
			    method: "post",
			    data: [ item.id ]
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.$refs.table.clearSelection()
					this.getPayList(this.nowPage, this.nowSize)
			  });
			});
		},
		getRowKey(row) {
		  return row.id;
		},
		handleSelectionChange(val) {
		  this.selectList = val;
		},
		toAddPayPage() {
			this.$router.push({ path: "/home/add_pay" })
		},
		toEditPayPage(item) {
			this.$router.push({ path: `/home/edit_pay?id=${item.id}` })
		},
		// 重置
		refresh() {
		  this.$refs.pagination.toFirstPage()
		},
		// // 点击搜索
		// search() {
		//   this.$refs.pagination.toFirstPage()
		// },
		// searchEnter(e) {
		// 	e.keyCode === 13 && this.$refs.pagination.toFirstPage()
		// }
	}
}