export default {
  methods: {
    // 删除所有缓存
    deleteAll() {
      this.$showMsgBox({ msg: `是否删除所有缓存?` }).then(() => {
        this.$http_json({
          url: "/api/redis/delAll",
          method: "post"
        }).then(() => {
          this.$successMsg("删除成功");
          this.getRedisList();
        });
      });
    },
    // 删除缓存
    deleteRedis(item) {
      this.$showMsgBox({ msg: `是否删除当前缓存?` }).then(() => {
        this.$http_json({
          url: "/api/redis/del",
          method: "post",
          data: item
        }).then(() => {
          this.$successMsg("删除成功");
          this.getRedisList();
        });
      });
    },
    // 显示弹窗
    showDetail(detail) {
      this.redisDetail = detail;
      this.dialogVisible = true;
    },
    // 点击搜索
    search() {
      this.nowPage = 1;
      this.getRedisList();
    },
    // 回车搜索
    searchEnter(e) {
      this.nowPage = 1;
      e.keyCode === 13 && this.getRedisList();
    },
  }
}