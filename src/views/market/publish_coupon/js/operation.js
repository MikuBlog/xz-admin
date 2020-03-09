export default {
	methods: {
		// 分页处理
		initialPage(totalElements) {
		  this.totalElements = totalElements;
		},
		initialCouponPublishList(list) {
		  this.couponPublishList.splice(0);
		  list.forEach(value => {
		    this.couponPublishList.push(value);
		  });
		},
		getCouponPublishList(page, size) {
		  this.$http_normal({
		    url: `/api/couponIssue/page?page=${page - 1}&size=${
		      size
		      }&sort=createTime,desc${this.searchVal ? `&couponName=${this.searchVal}` : ""}`,
		    method: "get"
		  }).then(result => {
		    const data = result.data;
		    this.initialPage(data.totalElements);
		    this.initialCouponPublishList(data.content);
		  });
    },
    deleteAllCoupon() {
			if (this.selectList.length == 0) {
			  this.$warnMsg("请勾选优惠券进行批量删除")
			  return
			}
			this.$showMsgBox({
			  msg: `<p>是否删除选优惠券?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/couponIssue/del`,
			    method: "post",
			    data: this.selectList.map(val => val.id)
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.$refs.table.clearSelection()
			    this.getCouponPublishList(this.nowPage, this.nowSize)
			  });
			});
		},
		deleteCoupon(item) {
			this.$showMsgBox({
			  msg: `<p>是否删除选优惠券?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/couponIssue/del`,
			    method: "post",
			    data: [ item.id ]
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.$refs.table.clearSelection()
					this.getCouponPublishList(this.nowPage, this.nowSize)
			  });
			});
		},
    showEditBox(item) {
      const form = this.$refs.form
      form.form.id = item.id
      form.form.status = item.status
      form.dialog = true
    },
		getRowKey(row) {
		  return row.id;
		},
		handleSelectionChange(val) {
		  this.selectList = val;
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