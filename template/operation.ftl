export default {
	methods: {
		search() {
			<#if queryColumns??>
			this.selectType
			? this.$refs.pagination.toFirstPage()
			: this.$warnMsg("请选择类型进行搜索")
			<#else>
			this.$refs.pagination.toFirstPage()
			</#if>
		},
		refresh() {
			this.$refs.pagination.toFirstPage()
		},
		getRowKey(row) {
		  return row.id;
		},
		// 选中用户
		handleSelectionChange(val) {
		  this.selectList = val;
		},
    showAddBox() {
      const form = this.$refs.form
      form.isAdd = true
      form.dialog = true
    },
    showEditBox() {
      const form = this.$refs.form
      form.isAdd = false
      form.dialog = true
    },
		downloadList() {
		  this.$http_json({
		    url: "?sort=createTime,desc<#if queryColumns??>this.selectType ? this.selectType=this.searchVal : ""<#else>this.searchVal ? title=this.searchVal : ""</#if><#if betweens??>
		      this.date
		        ? "greatTime=this.dateArray[0]lessTime=this.dateArray[1]"
		        : ''
		      </#if>",
		    responseType: 'blob',
		    method: "get"
		  }).then(result => {
		    const a = document.createElement('a')
		    a.href = window.URL.createObjectURL(result.data)
		    a.click()
		  }).catch(e => {
		    this.$errorMsg(e)
		  })
		},
		<#if betweens??>
			<#list betweens as column>
				<#if column.queryType = 'BetWeen'>
				// 日期格式化
				initialDate_${column_index + 1}() {
					this.dateArray_${column_index + 1}.splice(0, this.dateArray_${column_index + 1}.length);
					this.date_${column_index + 1} &&
						this.dateArray_${column_index + 1}.push(
							this.$formatDate(this.date_${column_index + 1}[0], true),
							this.$formatDate(this.date_${column_index + 1}[1], true)
						);
				},
				getDate_${column_index + 1}() {
				  this.initialDate_${column_index + 1}();
				  this.$refs.pagination.toFirstPage()
				},
				</#if>
			</#list>
		</#if>
		// 批量删除资讯
		deleteAll() {
			if (this.selectList.length == 0) {
			  this.$warnMsg("请勾选${tableComment}进行批量删除")
			  return
			}
			this.$showMsgBox({
			  msg: "<p>是否删除选中${tableComment}?</p>",
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: "",
			    method: "post",
			    data: this.selectList.map(val => val.id)
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.getList(this.nowPage, this.nowSize)
			  });
			});
		},
		deleteItem(item) {
			this.$showMsgBox({
			  msg: "<p>是否删除选中${tableComment}?</p>",
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: ``,
			    method: "post",
			    data: [ item.id ]
			  }).then(() => {
			    this.$successMsg("删除成功");
					this.getList(this.nowPage, this.nowSize)
			  });
			});
		},
		// 分页处理
		initialPage(totalElements) {
		  this.totalElements = totalElements;
		},
		initialList(list) {
		  this.list.splice(0);
		  list.forEach(value => {
		    this.list.push(value);
		  });
		},
		getList(page, size) {
		  this.$http_normal({
		    url: "?page=page - 1size=
		      size
		      sort=createTime,desc<#if queryColumns??>this.selectType ? this.selectType=this.searchVal : ""<#else>this.searchVal ? title=this.searchVal : ''</#if><#if betweens??>
		      this.date
		        ? greatTime=this.dateArray[0] lessTime=this.dateArray[1]
		        : ''
		      }</#if>",
		    method: "get"
		  }).then(result => {
		    const data = result.data;
        this.$refs.table.clearSelection()
		    this.initialPage(data.totalElements);
		    this.initialList(data.content);
		  });
		},
	}
}