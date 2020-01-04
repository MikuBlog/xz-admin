export default {
  methods: {
    // 更新用户数据
    updateUserInfo() {
      this.$emit("updateUserInfo");
    },
		refresh() {
			this.searchVal = ""
			this.$refs.pagination.toFirstPage()
		},
    // 点击搜索
    search() {
      this.$refs.pagination.toFirstPage()
    },
    // 回车搜索
    searchEnter(e) {
      e.keyCode === 13 && this.$refs.pagination.toFirstPage()
    },
    uploadAvatar(result) {
      this.$http_file({
        url: '/api/user/updateAvatar',
        method: 'post',
        data: {
          file: result
        }
      }).then(() => {
        this.isShow = false;
        this.updateUserInfo()
        this.$successMsg('更换头像成功，正在缓慢加载中~');
      })
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