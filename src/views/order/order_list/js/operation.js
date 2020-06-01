import convertHttp from '@/utils/convertHttp'
export default {
  watch: {
    activeName() {
      this.searchType = this.activeName
      this.search()
    }
  },
	methods: {
    convertHttp,
		// 分页处理
		initialPage(totalElements) {
		  this.totalElements = totalElements;
		},
		// 初始化订单列表
		initialList(list) {
		  this.list.splice(0);
		  list.forEach(value => {
        value.orderCartInfos = value.orderItemList.map(val => {
          return JSON.parse(val.cartInfo)
        })
		    this.list.push(value);
		  });
		},
		// 获取订单列表
		getList(page, size) {
		  this.$http_normal({
		    url: `/api/orderForm/page?page=${page - 1}&size=${
		      size
		      }&sort=editTime,desc${this.searchVal ? `&blurry=${this.searchVal}` : ""}${
            this.date
              ? `&greatCreateTime=${this.dateArray[0]}&lessCreateTime=${this.dateArray[1]}`
              : ""
            }${this.activeName !== 'null' && this.activeName > -200
            ? `&status=${this.activeName}`
          : ''}${this.searchType <= -200
          ? `&lessStatus=${this.searchType}`
        : ''}`,
		    method: "get"
		  }).then(result => {
        const data = result.data;
        this.$refs.table.clearSelection()
		    this.initialPage(data.totalElements);
		    this.initialList(data.content);
		  });
    },
    sendDelivery(item) {
      const form = this.$refs.form
      form.form.id = item.id
      form.dialog = true
    },
    refund(item) {
      const form = this.$refs.refund
      form.form.id = item.id
      form.form.refundPrice = item.refundPrice
      form.dialog = true
    },
		// 批量删除订单
		deleteAllComment() {
			if (this.selectList.length == 0) {
			  this.$warnMsg("请勾选订单进行批量删除")
			  return
			}
			this.$showMsgBox({
			  msg: `<p>是否删除选中订单?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/orderForm/del`,
			    method: "post",
			    data: this.selectList.map(val => val.id)
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.getList(this.nowPage, this.nowSize)
			  });
			});
    },
    showDetailBox(item) {
      const detail = this.$refs.detail
      detail.id = item.id
      detail.getDetail()
      detail.dialog = true
    },
    // // 回复订单
    // replyComment(item) {
    //   const form = this.$refs.form
    //   form.form.id = item.id
    //   form.dialog = true
    // },
		// 删除订单
		deleteComment(item) {
			this.$showMsgBox({
			  msg: `<p>是否删除选中订单?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/orderForm/del`,
			    method: "post",
			    data: [ item.id ]
			  }).then(() => {
			    this.$successMsg("删除成功");
					this.getList(this.nowPage, this.nowSize)
			  });
			});
    },
    // 日期格式化
    initialDate() {
      this.dateArray.splice(0, this.dateArray.length);
      this.date &&
        this.dateArray.push(
          this.$formatDate(this.date[0], true),
          this.$formatDate(this.date[1], true)
        );
    },
    // 获取日期
    getDate() {
      this.initialDate();
      this.$refs.pagination.toFirstPage()
    },
		getRowKey(row) {
		  return row.id;
		},
		// 选中订单
		handleSelectionChange(val) {
		  this.selectList = val;
		},
		// 添加订单
		toAddArticlePage() {
			this.$router.push({ path: "/home/add_article" })
		},
		// 编辑订单
		toEditArticlePage(item) {
			this.$router.push({ path: `/home/edit_article?id=${item.id}` })
		},
		// 重置
		refresh() {
      this.searchVal = ""
      this.date = ""
      this.dateArray = []
		  this.$refs.pagination.toFirstPage()
		},
		// 点击搜索
		search() {
		  this.$refs.pagination.toFirstPage()
		}
	}
}