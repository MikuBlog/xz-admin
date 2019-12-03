export default {
  methods: {
    copy(str, type) {
      this.$copyText(str).then(() => {
        this.$successMsg("复制成功");
      })
    }
  }
}