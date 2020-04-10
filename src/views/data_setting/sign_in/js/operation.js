export default {
	methods: {
		initialPage(totalElements) {
		  this.totalElements = totalElements;
		},
		initialSignInRulesList(list) {
		  this.signInRulesList.splice(0);
		  list.forEach(value => {
				value.value = JSON.parse(value.value)
				Object
					.keys(value.value)
					.forEach(val => {
						if(val !== 'id') {
							value[val] = value.value[val]
						}
					})
		    this.signInRulesList.push(value);
		  });
		},
		getSignInRules(page, size) {
		  this.$http_normal({
		    url: `/api/groupData/page?page=${page - 1}&size=${
		      size
		      }&sort=sort,asc&groupName=sign_day_num${this.searchVal ? `&value=${this.searchVal}` : ""}`,
		    method: "get"
		  }).then(result => {
        const data = result.data;
        this.$refs.table.clearSelection()
		    this.initialPage(data.totalElements);
		    this.initialSignInRulesList(data.content);
		  });
		},
		deleteAllSignInRules() {
			if (this.selectList.length == 0) {
			  this.$warnMsg("请勾选滚动签到规则进行批量删除")
			  return
			}
			this.$showMsgBox({
			  msg: `<p>是否删除选中签到规则?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/groupData/del`,
			    method: "post",
			    data: this.selectList.map(val => val.id)
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.getSignInRules(this.nowPage, this.nowSize)
			  });
			});
		},
		deleteSignInRules(item) {
			this.$showMsgBox({
			  msg: `<p>是否删除选中签到规则?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/groupData/del`,
			    method: "post",
			    data: [ item.id ]
			  }).then(() => {
			    this.$successMsg("删除成功");
					this.getSignInRules(this.nowPage, this.nowSize)
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
			const form = this.$refs.form
			form.dialog = true
			form.isAdd = true
		},
		showEditBox(item) {
			const form = this.$refs.form
			form.form.id = item.id
			form.getDetail()
			form.dialog = true
			form.isAdd = false
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