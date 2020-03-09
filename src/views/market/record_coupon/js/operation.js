export default {
	methods: {
		// 分页处理
		initialPage(totalElements) {
		  this.totalElements = totalElements;
		},
		// 初始化资讯列表
		initialCouponRecordList(list) {
		  this.couponRecordList.splice(0);
		  list.forEach(value => {
		    this.couponRecordList.push(value);
		  });
		},
		// 获取资讯列表
		getCouponRecordList(page, size) {
		  this.$http_normal({
		    url: `/api/couponUser/page?page=${page - 1}&size=${
		      size
		      }&sort=createTime,desc${this.searchVal ? `&couponTitle=${this.searchVal}` : ""}`,
		    method: "get"
		  }).then(result => {
		    const data = result.data;
		    this.initialPage(data.totalElements);
		    this.initialCouponRecordList(data.content);
		  });
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