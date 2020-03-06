export default {
  created() {
    this.getLevelList()
  },
	methods: {
    initialLevelList(list) {
		  this.levelList.splice(0);
		  list.forEach(value => {
		    this.levelList.push({
          label: value.name,
          value: value.id
        });
		  });
		},
    // 获取会员等级列表
    getLevelList() {
		  this.$http_normal({
		    url: `/api/memberLevel/page?page=0&size=9999&sort=createTime,desc`,
		    method: "get"
		  }).then(result => {
		    const data = result.data;
		    this.initialLevelList(data.content);
		  });
		},
		// 分页处理
		initialPage(totalElements) {
		  this.totalElements = totalElements;
		},
		// 初始化等级任务列表
		initialMissionList(list) {
		  this.missionList.splice(0);
		  list.forEach(value => {
		    this.missionList.push(value);
		  });
		},
		// 获取等级任务列表
    getMissionList(page, size) {
		  this.$http_normal({
		    url: `/api/memberTask/page?page=${page - 1}&size=${
		      size
		      }&sort=createTime,desc${this.searchVal ? `&name=${this.searchVal}` : ""}${this.levelId ? `&levelId=${this.levelId}` : ''}`,
		    method: "get"
		  }).then(result => {
		    const data = result.data;
		    this.initialPage(data.totalElements);
		    this.initialMissionList(data.content);
		  });
		},
		deleteAllMission() {
			if (this.selectList.length == 0) {
			  this.$warnMsg("请勾选等级任务进行批量删除")
			  return
			}
			this.$showMsgBox({
			  msg: `<p>是否删除选中等级任务?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/memberTask/del`,
			    method: "post",
			    data: this.selectList.map(val => val.id)
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.$refs.table.clearSelection()
			    this.getMissionList(this.nowPage, this.nowSize)
			  });
			});
		},
		// 删除等级任务
		deleteMission(item) {
			this.$showMsgBox({
			  msg: `<p>是否删除选中等级任务?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/memberTask/del`,
			    method: "post",
			    data: [ item.id ]
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.$refs.table.clearSelection()
					this.getMissionList(this.nowPage, this.nowSize)
			  });
			});
		},
		getRowKey(row) {
		  return row.id;
		},
		// 选中等级任务
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
      this.levelId = ""
		  this.$refs.pagination.toFirstPage()
		},
		// 点击搜索
		search() {
		  this.$refs.pagination.toFirstPage()
		}
	}
}