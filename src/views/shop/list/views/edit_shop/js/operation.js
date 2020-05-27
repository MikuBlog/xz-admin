import convertHttp from '@/utils/convertHttp'
export default {
  async created() {
    await this.getAddressList()
    this.getDetail()
  },
  mounted() {
    this.initMap()
  },
  methods: {
    getDetail() {
      this.$http_json({
        url: `/api/business/get/${this.form.id}`,
        method: "get"
      }).then(result => {
        const data = result.data
        this.form.name = data.name
        this.form.fullName = data.fullName
        this.form.info = data.info
        this.form.image = data.image
        this.form.phone = data.phone
        this.form.detailAddress = data.detailAddress
        this.form.longitude = data.longitude
        this.form.latitude = data.latitude
        this.form.description = data.description
        this.form.provinceId = data.provinceId
        this.form.cityId = data.cityId
        this.form.districtId = data.districtId
        this.form.city = data.city
        this.form.province = data.province
        this.form.district = data.district
        this.coverImage = convertHttp(data.image)
        this.address = [data.provinceId, data.cityId, data.districtId]
      })
    },
    getLonLan() {
      let str = this.preAddress+this.form.detailAddress
      if(!str) {
        this.$warnMsg("请先选择并填写门店地址")
        return
      }
      this.geocoder.getLocation(str)
    },
    handleChange(e) {
      let 
        node = this.$refs.addressBox.getCheckedNodes()[0],
        times = 0
        this.preAddress = ""
      while(node) {
        switch(times) {
          case 0: this.form.district = node.label; break
          case 1: this.form.city = node.label; break
          case 2: this.form.province = node.label; break
        }
        times += 1
        this.preAddress = `${node.label}${this.preAddress}`
        node = node.parent
      }
      this.form.provinceId = e[0]
      this.form.cityId = e[1]
      this.form.districtId = e[2]
    },
    getAddressList() {
      return this.$http_json({
        url: "/api/region/queryAll",
        method: "get"
      }).then(result => {
        this.addressList = result.data.map(val => {
          if(val.label === '海外' || val.label === '澳门特别行政区') val.disabled = true
          return val
        })
      })
    },
    initMap() {
      let callbacks = {
        //若服务请求成功，则运行以下函数，并将结果传入 
        complete: result => {
          const data = result.detail.location
          this.form.longitude = data.lng
          this.form.latitude = data.lat
        },
        //若服务请求失败，则运行以下函数 
        error: e => {
          this.$warnMsg("请输入正确且完整的地址")
        }
      }
      //创建类实例 
      this.geocoder = new qq.maps.Geocoder(callbacks); 
    },
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
				this.form.image = result.data.url
        this.$successMsg("上传成功！");
      });
    },
    // 选择资讯分类
    handleSelect(item) {
      this.form.types[0].name = item.name
			this.form.types[0].id = item.id
    },
    // 新增资讯
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$http_json({
            url: "/api/business/edit",
            method: "post",
            data: this.form
          }).then(result => {
            this.$successMsg("编辑成功");
            this.$router.push({ path: "/home/shop_list" })
          });
        } else {
          return false;
        }
      });
    },
    // 重置表单
    resetForm() {
      try {
				this.form.description = ""
        this.$refs.form.resetFields();
      } catch (e) {}
    }
  }
}