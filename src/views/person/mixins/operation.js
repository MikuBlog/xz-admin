export default {
  methods: {
    // 更新用户数据
    updateUserInfo() {
      this.$emit("updateUserInfo");
    },
    // 点击搜索
    search() {
      this.getOpertionLogList(1, this.nowSize);
    },
    // 回车搜索
    searchEnter(e) {
      e.keyCode === 13 && this.getOpertionLogList(1, this.nowSize);
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