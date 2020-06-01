import convertHttp from '@/utils/convertHttp'
export default {
  created() {
    this.getDetail()
    this.getGoodsTypeList()
    this.getSkuList()
    this.getVipList()
    this.getTemplateList()
  },
  methods: {
    deleteLadder(ind) {
      if (this.ladderList.length === 1) {
        this.$warnMsg("至少设置一项")
        return
      }
      this.ladderList.splice(0, ind)
    },
    addLadder() {
      if (this.ladderList.length === 3) {
        this.$warnMsg("最多只能设置三项")
        return
      }
      this.ladderList.push({
        buyCount: 0,
        discount: 0
      })
    },
    deleteFull(ind) {
      if (this.fullReductionList.length === 1) {
        this.$warnMsg("至少设置一项")
        return
      }
      this.fullReductionList.splice(0, ind)
    },
    addFull() {
      if (this.fullReductionList.length === 3) {
        this.$warnMsg("最多只能设置三项")
        return
      }
      this.fullReductionList.push({
        fullPrice: 0,
        reducePrice: 0
      })
    },
    preStep() {
      if (!this.active) return
      this.active -= 1
    },
    nextStep() {
      this.active += 1
    },
    handleClose(tag, key) {
      let index = this[key].indexOf(tag)
      if (key === 'selectSkuLabel') {
        this.selectSkuList.splice(index, 1)
        this.bindingSelectSkuList = this.bindingSelectSkuList.filter(val => val[0] !== tag)
      }
      this[key].splice(index, 1);
    },
    showInput(key_1, key_2) {
      this[key_1] = true;
      this.$nextTick(_ => {
        this.$refs[key_2].$refs.input.focus();
      });
    },
    handleInputConfirm(key_1, key_2, key_3) {
      let inputValue = this[key_1];
      if(inputValue === '') {
        this[key_2] = false
        return
      }
      if (key_3 === 'selectSkuLabel' && inputValue && !this[key_3].includes(inputValue)) {
        this.selectSkuList.push({
          label: inputValue,
          inputValue: '',
          inputVisible: false,
          children: []
        })
      }
      if (inputValue && !this[key_3].includes(inputValue)) {
        this[key_3].push(inputValue);
      } else {
        this.$warnMsg("不允许重复")
      }
      this[key_2] = false;
      this[key_1] = '';
    },
    showInputChildren(index) {
      this.selectSkuList[index].inputVisible = true;
    },
    handleCloseChildren(tag, index) {
      this.selectSkuList[index].children.splice(
        this.selectSkuList[index].children.indexOf(tag),
        1
      )
    },
    handleInputConfirmChildren(index) {
      let inputValue = this.selectSkuList[index].inputValue;
      if (inputValue && !this.selectSkuList[index].children.includes(inputValue)) {
        this.selectSkuList[index].children.push(inputValue);
      } else {
        this.$warnMsg("不允许重复")
      }
      this.selectSkuList[index].inputVisible = false;
      this.selectSkuList[index].inputValue = '';
    },
    handleRemove(file, fileList) {
      let index = fileList.findIndex(fileItem => {
        return fileItem.uid === file.uid
      })
      this.sliderImage.splice(index, 1)
      this.form.spu.sliderImage.splice(index, 1)
      this.fileList.splice(index, 1)
      // this.$http_json({
      //   url: "/api/localStorage/del",
      //   method: "post",
      //   data: [this.fileList[index].id]
      // }).then(result => {
      //   this.fileList.splice(index, 1)
      // })
    },
    generatorSkuList() {
      this.generateSkuList.splice(0)
      this.selectSkuList.forEach(val => {
        this.generateSkuList.push({
          name: val.label,
          category: val.children.map(val => {
            return {
              name: val,
							costPrice: 0,
							image: "",
							sales: 0,
							salesPrice: 0,
              stock: 0,
              weight: 0,
              warnStock: 0,
							value: val,
              checked: false,
              onShow: true,
							coverImage: ''
            }
          })
        })
      })
      try {
        this.generateSkuList = this.generateSkuList.reduce((ary, {
          name,
          category
        }) => {
          return ary.length ? [].concat(...category.map(v => ary.map(
            res => ({
              skuDesc: {
                ...res.skuDesc,
                [name]: v.name
              },
              ...v
            })))) :
            category.map(
              v => ({
                skuDesc: {
                  [name]: v.name
                },
                ...v
              }));
        }, []);
        this.caculateSalesPrice()
        this.ensureSkuList = JSON.parse(JSON.stringify(this.selectSkuList))
      } catch (e) {
        this.$warnMsg("规格值不能为空")
      }
      this.$http_json({
        url: "/api/productSpec/save",
        method: "post",
        data: this.selectSkuList.map((val, ind) => {
          for (let i = 0, len = this.skuList.length; i < len; i++) {
            if (val.label === this.skuList[i].label) {
              return {
                id: this.skuList[i].id,
                name: val.label,
                value: JSON.stringify(val.children)
              }
            }
          }
          return {
            name: val.label,
            value: JSON.stringify(val.children)
          }
        })
      }).then(result => {
        this.getSkuList()
      })
    },
    selectAllSku(e) {
      if (e) {
        this.generateSkuList.forEach(val => {
          val.checked = true
        })
      } else {
        this.generateSkuList.forEach(val => {
          val.checked = false
        })
      }
    },
    deleteSku(index) {
      this.generateSkuList.splice(index, 1)
    },
    deleteAllSku() {
      for (let i = this.generateSkuList.length - 1; i >= 0; i--) {
        if (this.generateSkuList[i].checked) {
          this.generateSkuList.splice(i, 1)
        }
      }
    },
    showEditBox() {
      this.$refs.editForm.dialog = true
    },
    caculateSalesPrice() {
      let lowest = Infinity
      this.salesPriceList.splice(0)
      this.generateSkuList.forEach(val => {
        if (val.salesPrice < lowest) {
          lowest = val.salesPrice
        }
      })
      this.salesPriceList = this.$removeRepeat(this.generateSkuList, 'salesPrice')
      this.form.spu.salesPrice = lowest
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
        this.sliderImage.push(data.url)
        this.form.spu.sliderImage.push(data.url)
        this.fileList.push(data.id)
        this.$successMsg("上传成功！");
      });
    },
    setIndex(index) {
      this.inputChildrenIndex = index
    },
    uploadImage_3(param) {
      this.$http_file({
        url: "/api/localStorage/upload",
        method: "post",
        data: {
          file: param.file
        },
        timeout: 100000
      }).then(result => {
        const data = result.data
        this.generateSkuList[this.inputChildrenIndex].image = data.url
        this.generateSkuList[this.inputChildrenIndex].coverImage = convertHttp(data.url)
        this.$successMsg("上传成功！");
      });
    },
    querySearchAsync(val, cb) {
      this.$http_normal({
        url: `/api/productBrand/page?page=0&size=9999&sort=sort,asc`,
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
          children: val.children ?
            this.handleGoodsTypeList(val.children) : null
        })
      })
      return newList
    },
    getGoodsTypeList() {
      this.$http_json({
        url: `/api/productType/queryAll?sort=sort,asc`,
        method: "get"
      }).then(result => {
        this.initialGoodsTypeList(this.handleGoodsTypeList(result.data.content));
      });
    },
    initialSkuList(list) {
      this.skuList.splice(0);
      list.forEach(value => {
        this.skuList.push(value);
      });
    },
    handleSkuList(list) {
      let newList = []
      list.forEach(val => {
        newList.push({
          id: val.id,
          label: val.name,
          value: val.name,
          children: val.value ?
            JSON.parse(val.value).map(val => {
              return {
                label: val,
                value: val
              }
            }) : null
        })
      })
      return newList
    },
    getVipList() {
      this.$http_json({
        url: "/api/memberLevel/page?page=0&size=9999&sort=grade,asc",
        method: "get"
      }).then(result => {
        this.vipList = result.data.content.map(val => {
          return {
            memberLevelId: val.id,
            memberLevelName: val.name,
            reducePrice: 0,
            discount: 0
          }
        })
      })
    },
    getTemplateList() {
      this.$http_json({
        url: "/api/freightTemplate/page?page=0&size=9999&sort=createTime,desc",
        method: "get"
      }).then(result => {
        this.templateList = result.data.content
      })
    },
    getSkuList() {
      this.$http_normal({
        url: `/api/productSpec/page?page=0&size=9999&sort=id,desc`,
        method: "get"
      }).then(result => {
        this.initialSkuList(this.handleSkuList(result.data.content))
      });
    },
    selectBrand(item) {
      this.form.spu.brandName = item.name
      this.form.spu.brandId = item.id
    },
    selectGoodsType(item) {
      this.typeId = []
      this.typeName.splice(0)
      item.forEach(val => {
        this.typeId.push(...val)
      })
      this.$refs.goodsType.getCheckedNodes().forEach(val => {
        this.typeName.push(val.label)
      })
      this.form.spu.typeId = `,${this.typeId.join(",")},`
    },
    merge(val) {
      let arr = [],
        key = "",
        ind = 0
      val.forEach(val => {
        if (key === val[0]) {
          ind--
          arr[ind].push(val[1])
        } else {
          key = val[0]
          arr[ind] = [val[0], val[1]]
        }
        ind++
      })
      return arr
    },
    selectSkuType(item) {
      const res = new Map();
      const arr = []
      this.skuList.forEach(val => {
        arr.push(val.label)
        if (val.children) {
          arr.push(...val.children.map(val => val.label))
        }
      })
      this.selectSkuLabel = this.selectSkuLabel.filter(val => {
        return arr.indexOf(val) === -1
      })
      this.selectSkuList = this.selectSkuList.filter(val => {
        return arr.indexOf(val.label) === -1
      })
      this.merge(item).forEach(val => {
        this.selectSkuList.push({
          label: val[0],
          inputVisible: false,
          inputValue: '',
          children: val.filter((val, ind) => ind !== 0) || []
        })
      })
      this.selectSkuLabel.push(...this.selectSkuList.map(val => val.label))
      this.selectSkuLabel = this.selectSkuLabel.filter(val => !res.has(val) && res.set(val, 1))
    },
    submitForm() {
      this.$refs.form.validate((valid, obj) => {
        if (valid) {
          this.getPostagePrice()
          if (this.generateSkuList.length && this.skuGroup === 'more') {
            // this.form.spu.specs = JSON.stringify(this.ensureSkuList.map(val => {
            // 	return {
            // 		name: val.label,
            // 		value: val.children
            // 	}
            // }))
            this.form.skus = this.generateSkuList.map(val => {
              return {
                id: val.id || null,
                costPrice: val.costPrice,
								image: val.image,
								sales: 0,
								salesPrice: val.salesPrice,
								stock: val.stock,
                value: JSON.stringify(val.skuDesc),
                warnStock: val.warnStock,
                weight: val.weight,
                onShow: val.onShow
              }
            })
          } else {
            this.form.skus.push({
              costPrice: this.form.spu.costPrice,
              image: this.form.spu.cover,
              sales: 0,
              salesPrice: this.form.spu.salesPrice,
              stock: this.form.spu.totalStock,
              value: JSON.stringify({
                '默认': '推荐'
              })
            })
            this.form.spu.specs = JSON.stringify([{
              name: '默认',
              value: ['推荐']
            }])
          }
          this.form.spu.keyWords = `,${this.dynamicTags.join(",")},`
          this.form.spu.typeName = JSON.stringify({
            typeName: this.typeName,
            typeObj: this.typeObj
          })
          let obj = {
            ...this.form.spu,
            fullReductionList: this.fullReductionList,
            ladderList: this.ladderList,
            memberPriceList: this.vipList.map(val => {
              val.memberPriceType = this.vipSelect
              return val
            }),
            promotionType: this.promotionType,
            skuList: this.form.skus,
            sliderImage: JSON.stringify(this.sliderImage),
            services: JSON.stringify(this.form.spu.services)
          }
          this.$http_json({
            url: "/api/productSpu/edit",
            method: "post",
            data: obj
          }).then(result => {
            this.$successMsg("编辑成功");
            this.$router.push({
              path: "/home/goods_list"
            })
          });
        } else {
          let str = ""
          Object
            .keys(obj)
            .forEach((key, ind) => {
              str += `<p>${ind + 1}.${obj[key][0].message}</p>`
            })
          this.$warnTip({
            title: "请将以下商品信息补充完整",
            msg: str
          })
          return false;
        }
      });
    },
    initialDetail(data) {
      let skus = data.skuList
      Object
        .keys(data)
        .forEach(val => {
          if (val !== 'editor' ||
            val !== 'editTime' ||
            val !== 'deletion' ||
            val !== 'creator' ||
            val !== 'createTime') {
            this.form.spu[val] = data[val]
          }
          if (val === 'typeName') {
            this.typeName = JSON.parse(data[val]).typeName
            this.typeObj = JSON.parse(data[val]).typeObj
            this.form.spu[val] = data[val]
          } else if (val === 'typeId') {
            this.typeId = data[val].replace(/^,/, '').replace(/,$/, '').split(",")
            this.form.spu[val] = data[val]
          } else if (val === 'brandName') {
            this.brandName = data[val]
          } else if (val === 'keyWords') {
            this.dynamicTags = data[val].replace(/^,/, '').replace(/,$/, '').length ?
              data[val].replace(/^,/, '').replace(/,$/, '').split(",") :
              []
          }else if(val === 'services') {
            this.form.spu[val] = JSON.parse(data[val])
          } else if (val === 'promotionType') {
            this.promotionType = data[val]
          } else if (val === 'specs') {
            const specs = JSON.parse(data[val])
            if (specs[0].name !== '默认') {
              specs.forEach(val => {
                this.ensureSkuList.push({
                  label: val.name,
                  children: val.value
                })
              })
            }
          } else if (val === 'sliderImage') {
            const list = JSON.parse(data[val])
            list.forEach(val => {
              this.fileList.push({
                url: convertHttp(val)
              })
              this.sliderImage.push(val)
            })
            this.form.spu.sliderImage = JSON.parse(data[val])
          } else if(val === 'fullReductionList') {
            this.fullReductionList = data[val]
          } else if(val === 'memberPriceList') {
            this.vipList = data[val]
            this.vipSelect = data[val][0].memberPriceType
          } else if(val === 'ladderList') {
            this.ladderList = data[val]
          }
        })
      if (new RegExp(/默认/g).test(skus[0].value)) {
        this.skuGroup = 'default'
      } else {
        this.skuGroup = 'more'
        this.generateSkuList = skus.map(val => {
          return {
            skuDesc: JSON.parse(val.value),
            coverImage: val.image
              ? convertHttp(val.image)
              : '',
            checked: false,
            ...val,
          }
        })
      }
      this.caculateSalesPrice()
      this.form.spu.salesPrice = data.salesPrice
    },
    getDetail() {
      this.$http_json({
        url: `/api/productSpu/get/${this.$route.query.id}`,
        method: "get"
      }).then(result => {
        this.initialDetail(result.data)
      })
    },
    // 重置表单
    resetForm() {
      try {
        this.brandName = ""
        this.form = {
          skus: [],
          spu: {
            attributes: "",
            barCode: "",
            brandId: "",
            brandName: "",
            codePath: "",
            costPrice: 0,
            cover: "",
            description: "",
            fictiSales: 0,
            giveIntegral: 0,
            info: "",
            keyWords: "",
            marketPrice: 0,
            merId: 0,
            merUse: 0,
            name: "",
            onBargain: 0,
            onBenefit: false,
            onBest: false,
            onFreeSend: false,
            onHot: false,
            onNew: false,
            onRecommend: false,
            onSeckill: false,
            onLimit: false,
            promotionStartTime: "",
            promotionEndTime: "",
            promotionPerLimit: 0,
            realSales: 0,
            salesPrice: 0,
            showStatus: 0,
            sliderImage: [],
            sort: 0,
            specs: "",
            stockReduceType: 0,
            totalStock: 0,
            typeId: [],
            typeName: [],
            unit: "",
            visit: 0,
            useIntegral: 0,
            freightTemplateId: "",
            services: []
          }
        }
        this.$refs.form.resetFields();
      } catch (e) { }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    format(key) {
      if (!this.form.spu[key]) {
        return
      }
      if (this.form.spu[key] <= 0) {
        this.form.spu[key] = 0
      }
    },
    formatChildren(key, index) {
      this.caculateSalesPrice()
    },
    getPostagePrice() {
      if (!this.form.spu.postagePrice) {
        return
      }
      if (this.form.spu.postagePrice > 0) {
        this.form.spu.onFreeSend = false
      } else {
        this.form.spu.onFreeSend = true
        this.form.spu.postagePrice = 0
      }
    }
  }
}
