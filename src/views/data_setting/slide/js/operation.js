import convertHttp from '@/utils/convertHttp'
export default {
	methods: {
		// 分页处理
		initialPage(totalElements) {
		  this.totalElements = totalElements;
		},
		// 初始化资讯列表
		initialSlideList(list) {
		  this.slideList.splice(0);
		  list.forEach(value => {
				value.coverImage = convertHttp(value.coverImage)
		    this.slideList.push(value);
		  });
		},
		// 获取幻灯片列表
		getSlideList(page, size) {
		  // this.$http_normal({
		  //   url: `/api/shop/article/page?page=${page - 1}&size=${
		  //     size
		  //     }&sort=sort,asc${this.searchVal ? `&keyword=${this.searchVal}` : ""}`,
		  //   method: "get"
		  // }).then(result => {
		  //   const data = result.data;
		  //   this.initialPage(data.totalElements);
		  //   this.initialSlideList(data.content);
		  // });
		},
		// 批量删除幻灯片
		deleteAllSlide() {
			if (this.selectList.length == 0) {
			  this.$warnMsg("请勾选幻灯片进行批量删除")
			  return
			}
			this.$showMsgBox({
			  msg: `<p>是否删除选中幻灯片?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/shop/article/del`,
			    method: "post",
			    data: this.selectList.map(val => val.id)
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.$refs.table.clearSelection()
			    this.getSlideList()
			  });
			});
		},
		// 删除幻灯片
		deleteSlide(item) {
			this.$showMsgBox({
			  msg: `<p>是否删除选中幻灯片?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/shop/article/del`,
			    method: "post",
			    data: [ item.id ]
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.$refs.table.clearSelection()
					this.getSlideList()
			  });
			});
		},
		getRowKey(row) {
		  return row.id;
		},
		// 选中幻灯片
		handleSelectionChange(val) {
		  this.selectList = val;
		},
		// 添加幻灯片
		showAddBox() {
			const form = this.$refs.form
			form.dialog = true
			form.isAdd = true
		},
		// 编辑幻灯片
		showEditBox(item) {
			const form = this.$refs.form
			form.dialog = true
			form.isAdd = false
		},
		// 重置
		refresh() {
		  this.searchVal = ""
		  this.getSlideList()
		},
		// 点击搜索
		search() {
		  this.getSlideList()
		},
		searchEnter(e) {
			e.keyCode === 13 && this.getSlideList()
		}
	}
}