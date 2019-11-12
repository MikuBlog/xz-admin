export default {
  methods: {
    // 还原操作日志
    recoverAuthority(item) {
      this.$showMsgBox({ msg: `是否恢复${item.name}操作日志?` }).then(() => {
        this.$http_json({
          url: `/api/authLog/recover/${item.id}`,
          method: "post"
        }).then(() => {
          this.$successMsg("恢复成功");
          this.getAuthorityLogList();
        });
      });
    },
    // 删除操作日志
    deleteAuthority(item) {
      this.$showMsgBox({ msg: `是否删除${item.name}操作日志?` }).then(() => {
        this.$http_json({
          url: `/api/authLog/del/${item.id}`,
          method: "post"
        }).then(() => {
          this.$successMsg("删除成功");
          this.getAuthorityLogList();
        });
      });
    },
    // 展示当前值
    showDetail(item) {
      const detail = this.$refs.detail
      detail.dialogVisible = true;
      detail.authorityOldDetail = this.$jsonPretty(item.oldValue, 1);
      detail.authorityNewDetail = this.$jsonPretty(item.newValue, 1);
    },
    // 点击搜索
    search() {
      this.nowPage = 1;
      this.selectType_1
        ? this.getAuthorityLogList()
        : this.$warnMsg("请选择搜索类型");
    },
    // 回车搜索
    searchEnter(e) {
      this.nowPage = 1;
      e.keyCode === 13 &&
        (this.selectType_1
          ? this.getAuthorityLogList()
          : this.$warnMsg("请选择搜索类型"));
    },
    // 日期格式化
    initialDate() {
      this.dateArray.splice(0, this.dateArray.length);
      this.date &&
        this.dateArray.push(
          this.$formDate(this.date[0], true),
          this.$formDate(this.date[1], true)
        );
    },
    // 获取操作类型
    getOperationType() {
      this.getAuthorityLogList();
    },
    // 获取日期
    getDate() {
      this.initialDate();
      this.getAuthorityLogList();
    }
  }
}