export default {
  methods: {
    copy(str) {
      this.$copyText(str).then(() => {
        this.$successMsg("复制成功");
      });
    }
  }
}