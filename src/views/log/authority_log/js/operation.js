export default {
  methods: {
    // 还原权限日志
    recoverAuthority(item) {
      this.$showMsgBox({ msg: `是否恢复${item.name}权限日志?` }).then(() => {
        this.$http_json({
          url: `/api/authLog/recover/${item.id}`,
          method: "post"
        }).then(() => {
          this.$successMsg("恢复成功");
          this.getAuthorityLogList();
        });
      });
    },
    // 删除权限日志
    deleteAuthority(item) {
      this.$showMsgBox({ msg: `是否删除${item.name}权限日志?` }).then(() => {
        this.$http_json({
          url: `/api/authLog/del`,
          method: "post",
					data: [ item.id ]
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
    // 重置
    refresh() {
      this.searchVal = ""
      this.selectType_1 = ""
      this.selectType_2 = ""
      this.date = ""
      this.$refs.pagination.toFirstPage()
    },
    // 点击搜索
    search() {
      this.selectType_1
        ? this.$refs.pagination.toFirstPage()
        : this.$warnMsg("请选择搜索类型");
    },
    // 获取操作类型
    getOperationType() {
      this.$refs.pagination.toFirstPage()
    },
     // 日期格式化
     initialDate() {
      this.dateArray.splice(0, this.dateArray.length);
      this.date &&
        this.dateArray.push(
          this.$formatDate(this.date[0], true),
          this.$formatDate(this.date[1], true)
        );
    },
    // 获取日期
    getDate() {
      this.initialDate();
      this.$refs.pagination.toFirstPage()
    }
  }
}