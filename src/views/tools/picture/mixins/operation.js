export default {
  methods: {
    // 复制图片地址
    copy(item) {
      this.$copyText(item.url).then(() => {
        this.$successMsg("复制成功");
      });
    },
    // 删除选中的图片
    deleteSelect() {
      this.$showMsgBox({ msg: `是否删除选中图片?` }).then(() => {
        this.$http_json({
          url: `/api/picture/del`,
          method: "post",
          data: this.idList
        }).then(() => {
          this.$successMsg("删除成功");
          this.getPictureList();
        });
      });
    },
    // 删除图片
    deletePicture(item) {
      this.$showMsgBox({ msg: `是否删除当前图片?` }).then(() => {
        this.$http_json({
          url: `/api/picture/del`,
          method: "post",
          data: [item.id]
        }).then(() => {
          this.$successMsg("删除成功");
          this.getPictureList();
        });
      });
    },
    // 上传图片
    uploadPic() {
      this.$refs.form.dialog = true;
    },
    // 选中图片
    selectItem(picArray) {
      this.idList = picArray.map(val => val.id);
      this.idList.length != 0
        ? (this.isShowButton = true)
        : (this.isShowButton = false);
    },
    // 点击搜索
    search() {
      this.nowPage = 1;
      this.getPictureList();
    },
    // 回车搜索
    searchEnter(e) {
      this.nowPage = 1;
      e.keyCode === 13 && this.getPictureList();
    }
  }
}