import convertHttp from '@/utils/convertHttp'
export default {
	methods: {
		// 分页处理
		initialPage(totalElements) {
		  this.totalElements = totalElements;
		},
		// 初始化会员等级列表
		initialLevelList(list) {
		  this.levelList.splice(0);
		  list.forEach(value => {
        value.imageUrl = value.icon
        ? convertHttp(value.icon)
        : ''
		    this.levelList.push(value);
		  });
		},
		// 获取会员等级列表
    getLevelList(page, size) {
		  this.$http_normal({
		    url: `/api/memberLevel/page?page=${page - 1}&size=${
		      size
		      }&sort=createTime,desc${this.searchVal ? `&name=${this.searchVal}` : ""}`,
		    method: "get"
		  }).then(result => {
        const data = result.data;
        this.$refs.table.clearSelection()
		    this.initialPage(data.totalElements);
		    this.initialLevelList(data.content);
		  });
		},
		deleteAllLevel() {
			if (this.selectList.length == 0) {
			  this.$warnMsg("请勾选会员等级进行批量删除")
			  return
			}
			this.$showMsgBox({
			  msg: `<p>是否删除选中会员等级?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/memberLevel/del`,
			    method: "post",
			    data: this.selectList.map(val => val.id)
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.getLevelList(this.nowPage, this.nowSize)
			  });
			});
		},
		// 删除会员等级
		deleteLevel(item) {
			this.$showMsgBox({
			  msg: `<p>是否删除选中会员等级?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/memberLevel/del`,
			    method: "post",
			    data: [ item.id ]
			  }).then(() => {
			    this.$successMsg("删除成功");
					this.getLevelList(this.nowPage, this.nowSize)
			  });
			});
		},
		getRowKey(row) {
		  return row.id;
		},
		// 选中会员等级
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
		// 重置
		refresh() {
      this.searchVal = ""
      this.category = ""
		  this.$refs.pagination.toFirstPage()
		},
		// 点击搜索
		search() {
		  this.$refs.pagination.toFirstPage()
		}
	}
}