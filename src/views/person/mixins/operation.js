export default {
  methods: {
    // 更新用户数据
    updateUserInfo() {
      this.$emit("updateUserInfo");
    },
    // 点击搜索
    search() {
      this.nowPage = 1;
      this.getOpertionLogList();
    },
    // 回车搜索
    searchEnter(e) {
      this.nowPage = 1;
      e.keyCode === 13 && this.getOpertionLogList();
    },
    // 修改密码
    showEditPassword() {
      this.$refs.pswForm.dialog = true;
      this.$refs.pswForm.resetForm();
    },
    // 修改邮箱
    showEditEmail() {
      this.$refs.emailForm.dialog = true;
      this.$refs.emailForm.resetForm();
    }
  }
}