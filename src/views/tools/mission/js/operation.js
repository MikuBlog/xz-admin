export default {
  methods: {
    // 弹出log
    showLogList() {
      this.$refs.table.dialog = true
    },
    // 恢复定时任务
    recoverItem(item) {
      this.$showMsgBox({
        msg: `<p>是否${item.paused ? '恢复' : '暂停'}${item.jobName}定时任务?</p>`,
        isHTML: true
      }).then(() => {
        this.$http_json({
          url: `/api/quartz/pause/${item.id}`,
          method: "post"
        }).then(() => {
          this.$successMsg(`${item.paused ? '恢复' : '暂停'}成功`);
          this.getMissionList();
        });
      });
    },
    // 执行定时任务
    executeItem(item) {
      this.$showMsgBox({
        msg: `<p>是否执行${item.jobName}定时任务?</p>`,
        isHTML: true
      }).then(() => {
        this.$http_json({
          url: `/api/quartz/exec/${item.id}`,
          method: "post"
        }).then(() => {
          this.$successMsg("执行成功");
          this.getMissionList();
        });
      });
    },
    // 删除定时任务
    deleteItem(item) {
      this.$showMsgBox({
        msg: `<p>是否删除${item.jobName}定时任务?</p>`,
        isHTML: true
      }).then(() => {
        this.$http_json({
          url: `/api/quartz/del`,
          method: "post",
					data: [ item.id ]
        }).then(() => {
          this.$successMsg("删除成功");
          this.getMissionList();
        });
      });
    },
    // 添加定时任务
    addItem() {
      const form = this.$refs.form
      this.isAdd = true
      form.dialog = true
      form.resetForm()
    },
    // 编辑定时任务
    editItem(item) {
      const 
        missionItem = this.$refs.form.missionForm,
        form = this.$refs.form
      form.missionId = item.id
      missionItem.jobName = item.jobName
      missionItem.beanName = item.beanName
      missionItem.methodName = item.methodName
      missionItem.params = item.params
      missionItem.cronExpression = item.cronExpression
      missionItem.paused = item.paused.toString()
      missionItem.remark = item.remark
      this.isAdd = false
      form.dialog = true
    },
    // 重置
    refresh() {
      this.searchVal = ""
      this.selectType = ""
      this.$refs.pagination.toFirstPage()
    },
    // 点击搜索
    search() {
      this.$refs.pagination.toFirstPage()
    },
    // 回车搜索
    searchEnter(e) {
      e.keyCode === 13 && this.$refs.pagination.toFirstPage()
    }
  }
}