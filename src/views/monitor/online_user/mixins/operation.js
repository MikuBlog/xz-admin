export default {
  methods: {
    getRowKey(row) {
      return row.id;
    },
    // 选择标签
    handleSelectionChange(val) {
      this.selectList = val;
    },
    // 批量踢出
    kickOutAll() {
      this.$showMsgBox({ msg: `是否踢出所选中用户?` }).then(() => {
        this.$http_json({
          url: `/auth/online/delBatch`,
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
          url: `/auth/online/${item.key}`,
          method: "post"
        }).then(() => {
          this.$successMsg("踢出成功");
          this.getOnlineUserList();
        });
      });
    },
    // 导出用户列表
    downloadUserList() {
      this.$http_json({
        url: "/auth/online/download",
        responseType: "blob",
        method: "get"
      }).then(result => {
        this.$download(
          result.data,
          `在线用户列表-${this.$formDate(new Date(), true)}.xls`,
          true
        );
      });
    },
    // 点击搜索
    search() {
      this.nowPage = 1;
      this.getOnlineUserList();
    },
    // 回车搜索
    searchEnter(e) {
      this.nowPage = 1;
      e.keyCode === 13 && this.getOnlineUserList();
    },
  }
}