export default {
  methods: {
    getRowKey(row) {
      return row.id;
    },
    // 复制图片地址
    copy(item) {
      this.$copyText(item.url).then(() => {
        this.$successMsg("复制链接成功");
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
          this.getPictureList(this.nowPage, this.nowSize);
        });
      });
    },
    // 删除图片
    deletePicture(item) {
      this.$showMsgBox({ msg: `是否删除当前图片?` }).then(() => {
        this.$http_json({
          url: `/api/picture/del`,
          method: "post",
          data: [ item.id ]
        }).then(() => {
          this.$successMsg("删除成功");
          this.getPictureList(this.nowPage, this.nowSize)
        });
      });
    },
    // 上传图片
    uploadPic() {
      this.$refs.form.dialog = true;
    },
    // 选中图片
    selectItem(picArray) {
      this.selectImageList = picArray.map(val => val.url)
      this.idList = picArray.map(val => val.id);
    },
    // 重置
    refresh() {
      this.searchVal = ""
      this.$refs.pagination.toFirstPage()
    },
    // 点击搜索
    search() {
      this.$refs.pagination.toFirstPage()
    },
    exportImage() {
      if(this.selectImageList.length == 0) {
        this.$warnMsg("请勾选图片进行批量导出")
        return
      }
      this.$exportFile(this.selectImageList, 'images')
    }
  }
}