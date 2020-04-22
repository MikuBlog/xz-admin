import convertHttp from '@/utils/convertHttp'
export default {
  async created() {
    await this.getGoodsList(this.nowPage, this.nowSize)
    this.getDetail()
  },
  methods: {
    initialData(data) {
      this.form.comSpu = {
        id: data.id,
        combinationDiscount: data.combinationDiscount,
        combinationPrice: data.combinationPrice,
        effectiveHour: data.effectiveHour,
        endTime: data.endTime,
        info: data.info,
        name: data.name,
        cover: data.cover,
        num: data.num,
        peopleCount: data.peopleCount,
        returnMoney: data.returnMoney,
        spuId: data.spuId,
        startTime: data.startTime,
        visit: data.visit,
        activityType: data.activityType,
        ruleType: data.ruleType,
        status: data.status
      }
    },
    getDetail() {
      this.$http_json({
        url: `/api/combinationSpu/get/${this.id}`,
        method: "get"
      }).then(result => {
        this.initialData(result.data.comSpu)
      })
    },
    getCurrentRow(item) {
      this.form.comSpu.name = item.name
      this.form.comSpu.spuId = item.id
      this.form.comSpu.cover = item.cover
      this.form.comSpu.num = item.num
    },
    // 分页处理
		initialPage(totalElements) {
		  this.totalElements = totalElements;
		},
		initialGoodsList(list) {
		  this.goodsList.splice(0);
		  list.forEach(value => {
				value.coverImage = value.cover
				? convertHttp(value.cover)
				: '',
				value.typeName = JSON.parse(value.typeName)
				value.specs = JSON.parse(value.specs)
		    this.goodsList.push(value);
		  });
		},
		getGoodsList(page, size) {
		  return this.$http_normal({
		    url: `/api/productSpu/page?page=${page - 1}&size=${
		      size
		      }&sort=sort,asc${this.productName ? `&name=${this.productName}` : ""}`,
		    method: "get"
		  }).then(result => {
        const data = result.data;
        this.$refs.table.clearSelection()
        this.product = ""
		    this.initialPage(data.totalElements);
		    this.initialGoodsList(data.content);
		  });
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if(!this.form.comSpu.spuId) {
            this.$warnMsg("请选择商品")
            return
          }
          this.$http_json({
            url: `/api/combinationSpu/edit`,
            method: "post",
            data: this.form
          }).then(result => {
            this.$successMsg("编辑成功");
            this.$router.go(-1)
          });
        } else {
          return false
        }
      })
    },
    getRowKey(row) {
		  return row.id;
		},
		handleSelectionChange(val) {
      if(val.length > 1) {
        this.$warnMsg("仅允许选择一个商品")
        return
      }
		  this.selectList = val;
		},
    // 点击搜索
		search() {
		  this.$refs.pagination.toFirstPage()
		}
  }
}