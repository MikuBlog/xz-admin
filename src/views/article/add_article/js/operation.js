import convertHttp from '@/utils/convertHttp'
export default {
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue && !this.dynamicTags.includes(inputValue)) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    // 上传封面
    uploadImage(param) {
      this.$http_file({
        url: "/api/localStorage/upload",
        method: "post",
        data: {
          file: param.file
        },
        timeout: 100000
      }).then(result => {
        this.coverImage = convertHttp(result.data.url)
				this.articleForm.coverImage = result.data.url
        this.$successMsg("上传成功！");
      });
    },
    // 获取资讯分类
    querySearchAsync(val, cb) {
      this.$http_json({
        url: `/api/shop/articleType/page?page=0&size=10&name=${val}`,
        method: "get"
      }).then(result => {
        cb(result.data.content)
      })
    },
    // 选择资讯分类
    handleSelect(item) {
      this.articleForm.types[0].name = item.name
			this.articleForm.types[0].id = item.id
    },
    // 新增资讯
    submitForm() {
      this.$refs.articleForm.validate(valid => {
        if (valid) {
					if(!this.articleForm.types[0].id) {
					  this.$warnMsg("请选择资讯分类")
					  return
					}
          if(!this.articleForm.content) {
            this.$warnMsg("请填写资讯内容")
            return
          }
          this.articleForm.labels = this.dynamicTags.join(",")
          this.$http_json({
            url: "/api/shop/article/add",
            method: "post",
            data: this.articleForm
          }).then(result => {
            this.$successMsg("添加成功");
            this.$router.push({ path: "/home/article_list" })
          });
        } else {
          return false;
        }
      });
    },
    // 重置表单
    resetForm() {
      try {
				this.articleForm.content = ""
        this.$refs.articleForm.resetFields();
      } catch (e) {}
    }
  }
}