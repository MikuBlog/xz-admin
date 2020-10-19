export default {
  methods: {
    getRowKey(row) {
      return row.id;
    },
    // 选择标签
    handleSelectionChange(val) {
      this.selectList = val;
    },
    // 重置
    refresh() {
      this.searchVal = ""
      this.$refs.pagination.toFirstPage()
    },
    // 批量踢出
    kickOutAll() {
      if(this.selectList.length == 0) {
        this.$warnMsg("请勾选用户进行批量踢出")
        return
      }
      this.$showMsgBox({ msg: `是否踢出所选中用户?` }).then(() => {
        this.$http_json({
          url: `/api/auth/online/del`,
          method: "post",
          data: this.selectList.map(val => val.key)
        }).then(() => {
          this.$successMsg("批量踢出成功");
          this.$refs.onlineUserTable.clearSelection()
          this.getOnlineUserList();
        });
      });
    },
    // 踢出
    kickOut(item) {
      this.$showMsgBox({ msg: `是否踢出当前用户?` }).then(() => {
        this.$http_json({
          url: `/api/auth/online/del`,
          method: "post",
					data: [ item.key ]
        }).then(() => {
          this.$successMsg("踢出成功");
          this.getOnlineUserList();
        });
      });
    },
    // 导出在线列表
    downloadList() {
      this.$http_json({
        url: "/api/auth/online/download",
        responseType: "blob",
        method: "get"
      }).then(result => {
				const a = document.createElement('a')
				a.href = window.URL.createObjectURL(result.data)
				a.click()
      });
    },
    // 点击搜索
    search() {
      this.$refs.pagination.toFirstPage()
    }
  }
}