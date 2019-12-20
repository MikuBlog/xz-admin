export default {
  methods: {
    getRowKey(row) {
      return row.id;
    },
    // 复制图片地址
    copy(item) {
      this.$copyText(item.url).then(() => {
        this.$successMsg("复制成功");
      });
    },
    // 批量删除图片
    deleteAll() {
      if(this.idList.length == 0) {
        this.$warnMsg("请勾选图片进行批量删除")
        return
      }
      this.$showMsgBox({ msg: `是否删除选中图片?` }).then(() => {
        this.$http_json({
          url: `/api/picture/del`,
          method: "post",
          data: this.idList
        }).then(() => {
          this.$successMsg("删除成功");
          this.$refs.pictureTable.clearSelection()
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
    },
    // 点击搜索
    search() {
      this.$refs.pagination.toFirstPage()
    },
    // 回车搜索
    searchEnter(e) {
      e.keyCode === 13 && this.$refs.pagination.toFirstPage();
    }
  }
}