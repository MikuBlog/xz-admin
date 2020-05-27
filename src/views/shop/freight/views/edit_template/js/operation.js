import convertHttp from '@/utils/convertHttp'
export default {
  created() {
    this.getAddressList()
    this.getDetail()
  },
  mounted() {
    this.initMap()
  },
  methods: {
    getDetail() {
      this.$http_json({
        url: `/api/freightTemplate/get/${this.form.id}`,
        method: "get"
      }).then(result => {
        const data = result.data
        this.form.name = data.name
        this.form.packagePrice = data.packagePrice
        this.form.freightType = data.freightType
        this.addressTable = data.table.map(val => {
          if(val.freeByMoney) val.isFreeByMoney = true
          if(val.freeByNumber) val.isFreeByNumber = true
          val.areaList = val.areaNames
          delete val.areaNames
          return val
        })
        if(data.defaultData.freeByMoney) data.isFreeByMoney = true
        if(data.defaultData.freeByNumber) data.isFreeByNumber = true
        delete data.defaultData.areaNames
        this.defaultData.splice(0)
        this.defaultData.push(data.defaultData)
      })
    },
    changeSwicth(key_1, key_2) {
      if (this.defaultData[0][key_1]) {
        this.defaultData[0][key_2] = 1
      }
    },
    changeVal(key_1, key_2) {
      if (!this.defaultData[0][key_1]) {
        this.defaultData[0][key_2] = false
      }
    },
    changeAddressSwicth(key_1, key_2, ind) {
      if (this.addressTable[ind][key_1]) {
        this.addressTable[ind][key_2] = 1
      }
    },
    changeAddressVal(key_1, key_2, ind) {
      if (!this.addressTable[ind][key_1]) {
        this.addressTable[ind][key_2] = false
      }
    },
    getLonLan() {
      let str = this.preAddress + this.form.detailAddress
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
    getAddressList() {
      this.$http_json({
        url: "/api/region/getAreas",
        method: "get"
      }).then(result => {
        this.$refs.addressBox.addressList = result.data.map((val, ind) => {
          return {
            id: val.value,
            label: val.label,
            key: ind,
            disabled: val.disabled
          }
        })
      })
    },
    // 新增资讯
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          for(let i = 0, len = this.addressTable.length; i < len ; i ++) {
            if(!this.addressTable[i].areaList.length) {
              this.$warnMsg(`第${i + 1}项，指定区域不能为空`)
              return
            }
          }
          this.$http_json({
            url: "/api/freightTemplate/edit",
            method: "post",
            data: {
              ...this.form,
              defaultData: this.defaultData.map(val => {
                delete val.isFreeByNumber
                delete val.isFreeByMoney
                return val
              })[0],
              table: this.addressTable.map(val => {
                delete val.isFreeByNumber
                delete val.isFreeByMoney
                delete val.areaList
                return val
              })
            }
          }).then(result => {
            this.$successMsg("编辑成功");
            this.$router.push({ path: "/home/freight_template" })
          });
        } else {
          return false;
        }
      });
    },
    showEditBox(ind, item) {
      const addressBox = this.$refs.addressBox
      addressBox.dialog = true
      addressBox.ind = ind
      addressBox.selectList = []
      let 
        areaList = item.areaList,
        arr = []
      this.addressTable.forEach(value => {
        addressBox.addressList.forEach((val, ind) => {
          if(value.areaList.indexOf(val.label) !== -1) {
            val.disabled = true
          }
        })
      })
      addressBox.addressList.forEach((val, ind) => {
        if(areaList.indexOf(val.label) !== -1) {
          arr.push(ind)
          val.disabled = false
        }
      })
      addressBox.selectList = arr
    },
    addItem() {
      this.addressTable.push({
        addCount: 0,
        addFee: 0,
        area: "",
        areaList: [],
        freeByMoney: 0,
        freeByNumber: 0,
        start: 0,
        startFee: 0,
        isFreeByNumber: false,
        isFreeByMoney: false
      })
    },
    removeItem(ind) {
      this.addressTable.splice(ind, 1)
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