import convertHttp from '@/utils/convertHttp'
export default {
  methods: {
    getRowKey(row) {
      return row.id;
    },
    // 文件预览
    preview(item) {
      this.$previewFile(convertHttp(item.url))
    },
		// 下载文件
		downloadFile(item) {
			this.$download(item.url, item.name)
		},
    // 批量删除文件
    deleteAll() {
      if(this.idList.length == 0) {
        this.$warnMsg("请勾选文件进行批量删除")
        return
      }
      this.$showMsgBox({ msg: `是否删除选中文件?` }).then(() => {
        this.$http_json({
          url: `/api/localStorage/del`,
          method: "post",
          data: this.idList
        }).then(() => {
          this.$successMsg("删除成功");
          this.getFileList(this.nowPage, this.nowSize);
        });
      });
    },
    // 删除文件
    deleteFile(item) {
      this.$showMsgBox({ msg: `是否删除当前文件?` }).then(() => {
        this.$http_json({
          url: `/api/localStorage/del`,
          method: "post",
          data: [ item.id ]
        }).then(() => {
          this.$successMsg("删除成功");
          this.getFileList(this.nowPage, this.nowSize);
        });
      });
    },
    // 上传文件
    uploadFile() {
      this.$refs.form.dialog = true;
    },
    // 选中文件
    selectItem(fileArray) {
      this.selectFileList = fileArray.map(val => val.url)
      this.idList = fileArray.map(val => val.id);
    },
    // 重置
    refresh() {
      this.searchVal = ""
      this.date = ""
      this.$refs.pagination.toFirstPage()
    },
    // 点击搜索
    search() {
      this.$refs.pagination.toFirstPage()
    },
    // 日期格式化
    initialDate() {
      this.dateArray.splice(0, this.dateArray.length);
      this.date &&
        this.dateArray.push(
          this.$formatDate(this.date[0], true),
          this.$formatDate(this.date[1], true)
        );
    },
    // 获取日期
    getDate() {
      this.initialDate();
      this.$refs.pagination.toFirstPage()
    },
    exportFile() {
      if(this.selectFileList.length == 0) {
        this.$warnMsg("请勾选文件进行批量导出")
        return
      }
      this.$exportFile(this.selectFileList, 'files')
    }
  }
}