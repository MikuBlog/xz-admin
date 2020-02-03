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
        this.imageUrl = convertHttp(result.data.url)
        this.$successMsg("上传成功！");
      });
    },
    // 获取商品分类
    querySearchAsync(val) {
      this.$http_json({
        url: "",
        method: "get"
      }).then(result => {
        cb(result.data)
      })
    },
    // 选择商品分类
    handleSelect(item) {
      this.articleForm.type = item.type
    },
    // 新增资讯
    submitForm() {
      this.$refs.articleForm.validate(valid => {
        if (valid) {
          if(!this.articleForm.content) {
            this.$warnMsg("请填写资讯内容")
            return
          }
          this.form.tags = this.dynamicTags.join(",")
          this.$http_json({
            url: "/api/user/add",
            method: "post",
            data: this.form
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
        this.$refs.articleForm.resetFields();
      } catch (e) {}
    }
  }
}