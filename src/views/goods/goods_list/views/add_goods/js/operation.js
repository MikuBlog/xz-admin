import convertHttp from '@/utils/convertHttp'
export default {
  created() {
    this.getGoodsTypeList()
    this.getBrandList()
  },
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
    handleRemove(file, fileList) {
      let index = fileList.findIndex( fileItem => {
        return fileItem.uid === file.uid
      })
      this.form.spu.sliderImage.splice(index, 1)
      this.$http_json({
        url: "/api/localStorage/del",
        method: "post",
        data: this.fileList
      }).then(result => {
        this.fileList.splice(index, 1)
      })
    },
    // 上传封面
    uploadImage_1(param) {
      this.$http_file({
        url: "/api/localStorage/upload",
        method: "post",
        data: {
          file: param.file
        },
        timeout: 100000
      }).then(result => {
        this.coverImage = convertHttp(result.data.url)
				this.form.spu.cover = result.data.url
        this.$successMsg("上传成功！");
      });
    },
    uploadImage_2(param) {
      this.$http_file({
        url: "/api/localStorage/upload",
        method: "post",
        data: {
          file: param.file
        },
        timeout: 100000
      }).then(result => {
        const data = result.data
        this.form.spu.sliderImage.push(data.url)
        this.fileList.push(data.id)
        this.$successMsg("上传成功！");
      });
    },
    querySearchAsync(val, cb) {
      this.$http_normal({
		    url: `/api/productBrand/page?page=9}&size=9999&sort=sort,asc`,
		    method: "get"
		  }).then(result => {
        cb(result.data.content)
		  });
    },
    initialGoodsTypeList(list) {
      this.goodsTypeList.splice(0)
      list.forEach(val => {
        this.goodsTypeList.push(val)
      })
    },
    handleGoodsTypeList(list) {
      let newList = []
      list.forEach(val => {
        newList.push({
          label: val.name,
          value: val.id,
          children: val.children
          ? this.handleGoodsTypeList(val.children)
          : null
        })
      })
      return newList
    },
    getGoodsTypeList() {
      this.$http_json({
        url: `/api/shop/productType/queryAll?sort=sort,asc`,
        method: "get"
      }).then(result => {
        this.initialGoodsTypeList(this.handleGoodsTypeList(result.data.content));
      });
    },
    selectBrand(item) {
      this.form.spu.brandName = item.name
      this.form.spu.brandId = item.id
    },
    selectGoodsType(item) {
      this.form.spu.typeId.splice(0)
      this.form.spu.typeName.splice(0)
      item.forEach(val => {
        this.form.spu.typeId.push(...val)
      })
      this.$refs.goodsType.getCheckedNodes().forEach(val => {
        this.form.spu.typeName.push(val.label)
      })
    },
    // 新增资讯
    submitForm() {
      console.log(this.form.spu.typeName)
      this.$refs.form.validate(valid => {
        if (valid) {
					if(!this.form.types[0].id) {
					  this.$warnMsg("请选择资讯分类")
					  return
					}
          if(!this.form.content) {
            this.$warnMsg("请填写资讯内容")
            return
          }
          this.form.labels = this.dynamicTags.join(",")
          this.$http_json({
            url: "/api/shop/article/add",
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
				this.form.content = ""
        this.$refs.form.resetFields();
      } catch (e) {}
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    format(key) {
      if(!this.form.spu[key]) {
        return
      }
      if(this.form.spu[key] <= 0) {
        this.form.spu[key] = 0
      }
    },
    getPostagePrice() {
      if(!this.form.spu.postagePrice) {
        return
      }
      if(this.form.spu.postagePrice > 0) {
        this.form.spu.onFreeSend = false
      }else {
        this.form.spu.onFreeSend = true
        this.form.spu.postagePrice = 0
      }
    }
  }
}