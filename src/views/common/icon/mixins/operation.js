export default {
  methods: {
    copy(str, type) {
      type === 'icons' 
      ? this.$copyText(str).then(() => {
        this.$successMsg("复制成功");
      })
      : this.$copyText(`<i class="${str}" />`).then(() => {
        this.$successMsg("复制成功");
      })
    }
  }
}