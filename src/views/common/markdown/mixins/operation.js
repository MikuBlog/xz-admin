export default {
  methods: {
    // 获取渲染值
    getVal(leftVal, rightVal) {
      this.rightMsg = rightVal;
    },
    // 替换上传图片的地址
    uploadImage(pos, file) {
      this.$http_file({
        url: "https://aboot.missiono.cn/api/picture/upload",
        method: "post",
        data: {
          file: file
        }
      }).then(result => {
        this.$successMsg("上传图片成功");
        this.$refs.editor.$img2Url(pos, result.data.url);
      });
    }
  }
}