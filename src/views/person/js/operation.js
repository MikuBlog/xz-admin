export default {
  methods: {
    // 更新用户数据
    updateUserInfo() {
      this.$emit("updateUserInfo");
    },
    uploadAvatar(result) {
      this.$http_file({
        url: '/api/user/updateAvatar',
        method: 'post',
        data: {
          file: new window.File([result], "avatar.png", {type: result.type})
        }
      }).then(() => {
        this.isShow = false;
        this.updateUserInfo()
        this.$successMsg('更换头像成功，正在缓慢加载中~');
      })
    }
  }
}