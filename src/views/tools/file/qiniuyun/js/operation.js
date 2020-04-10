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
			this.$http_json({
				url: `/api/qiNiuContent/downloadStorage?id=${item.id}&expireInSeconds=3600`,
				method: "get"
			}).then(result => {
				this.$download(result.data.url, item.name)
			})
		},
		// 分享链接
		shareLink(item) {
			const share = this.$refs.share
			share.fileId = item.id
			share.dialogVisible = true
		},
    // 批量删除文件
    deleteAll() {
      if(this.idList.length == 0) {
        this.$warnMsg("请勾选文件进行批量删除")
        return
      }
      this.$showMsgBox({ msg: `是否删除选中文件?` }).then(() => {
        this.$http_json({
          url: `/api/qiNiuContent/del`,
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
          url: `/api/qiNiuContent/del`,
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
			this.$http_json({
				url: "/api/qiNiuContent/synchronize",
				method: "post"
			}).then(result => {
				this.$refs.pagination.toFirstPage()
			})
    },
		// 弹出配置窗口
		showConfigModal() {
			const configBox = this.$refs.config
			configBox.dialog = true
			configBox.getConfigData()
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