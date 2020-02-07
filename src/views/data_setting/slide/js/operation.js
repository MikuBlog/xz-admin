import convertHttp from '@/utils/convertHttp'
export default {
	created() {
		this.getSlideList()
	},
	methods: {
		// 初始化资讯列表
		initialSlideList(list) {
		  this.slideList.splice(0);
		  list.forEach(value => {
				value.imageUrl = value.image 
				? convertHttp(value.image)
				: ''
		    this.slideList.push(value);
		  });
		},
		// 获取幻灯片列表
		getSlideList() {
		  this.$http_json({
		    url: `/api/shop/slide/queryAll${this.searchVal ? `?title=${this.searchVal}` : ""}`,
		    method: "get"
		  }).then(result => {
		    this.initialSlideList(result.data);
		  });
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
			    url: `/api/shop/slide/del`,
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
			    url: `/api/shop/slide/del`,
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
			Object.keys(item).forEach(val => {
				if(val !== 'imageUrl') {
					form.form[val] = item[val]
				}
			})
			form.imageUrl = convertHttp(item.image)
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