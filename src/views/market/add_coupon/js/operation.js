import convertHttp from '@/utils/convertHttp'
export default {
	methods: {
		// 分页处理
		initialPage(totalElements) {
		  this.totalElements = totalElements;
		},
		initialCouponList(list) {
		  this.couponList.splice(0);
		  list.forEach(value => {
		    this.couponList.push(value);
		  });
		},
    getCouponList(page, size) {
		  this.$http_normal({
		    url: `/api/coupon/page?page=${page - 1}&size=${
		      size
		      }&sort=createTime,desc${this.searchVal ? `&title=${this.searchVal}` : ""}`,
		    method: "get"
		  }).then(result => {
		    const data = result.data;
		    this.initialPage(data.totalElements);
		    this.initialCouponList(data.content);
		  });
		},
		deleteAllCoupon() {
			if (this.selectList.length == 0) {
			  this.$warnMsg("请勾选优惠券进行批量删除")
			  return
			}
			this.$showMsgBox({
			  msg: `<p>是否删除选中优惠券?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/coupon/del`,
			    method: "post",
			    data: this.selectList.map(val => val.id)
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.$refs.table.clearSelection()
			    this.getCouponList(this.nowPage, this.nowSize)
			  });
			});
		},
		// 删除优惠券
		deleteCoupon(item) {
			this.$showMsgBox({
			  msg: `<p>是否删除选中优惠券?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/coupon/del`,
			    method: "post",
			    data: [ item.id ]
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.$refs.table.clearSelection()
					this.getCouponList(this.nowPage, this.nowSize)
			  });
			});
		},
		getRowKey(row) {
		  return row.id;
		},
		// 选中优惠券
		handleSelectionChange(val) {
		  this.selectList = val;
		},
		showAddBox() {
      const form = this.$refs.form
      form.isAdd = true
      form.dialog = true
    },
    showEditBox(item) {
      const form = this.$refs.form
      form.dialog = true
      form.isAdd = false
      form.form.id = item.id
      form.getDetail()
    },
    showPublishBox(item) {
      const form = this.$refs.publishForm
      form.dialog = true
      form.isAdd = false
      form.form.couponId = item.id
      form.getDetail()
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