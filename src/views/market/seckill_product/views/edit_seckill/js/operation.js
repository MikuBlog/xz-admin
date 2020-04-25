import convertHttp from '@/utils/convertHttp'
export default {
  async created() {
    await this.getGoodsList(this.nowPage, this.nowSize)
    await this.getPeriodConfig()
    this.getDetail()
  },
  methods: {
    initialData(data) {
      this.form.seckillSpu = {
        id: data.id,
        seckillDiscount: data.seckillDiscount,
        seckillPrice: data.seckillPrice,
        stopTime: data.stopTime,
        info: data.info,
        name: data.name,
        cover: data.cover,
        num: data.num,
        returnMoney: data.returnMoney,
        timeId: data.timeId,
        spuId: data.spuId,
        startTime: data.startTime,
        ruleType: data.ruleType,
        status: data.status,
        limitBuy: data.limitBuy,
        activityType: data.activityType
      }
    },
    getDetail() {
      this.$http_json({
        url: `/api/seckillSpu/get/${this.id}`,
        method: "get"
      }).then(result => {
        this.initialData(result.data)
      })
    },
    initialList(list) {
      this.options.splice(0)
      list.forEach(val => {
        val.map.id = val.id
        this.options.push(val.map)
      })
    },
    getPeriodConfig() {
      this.$http_normal({
		    url: `/api/groupData/page?page=0&size=9999&sort=sort,asc&groupName=seckill_time`,
		    method: "get"
		  }).then(result => {
		    this.initialList(result.data.content);
		  });
    },
    getCurrentRow(item) {
      this.form.seckillSpu.name = item.name
      this.form.seckillSpu.spuId = item.id
      this.form.seckillSpu.cover = item.cover
      this.form.seckillSpu.num = item.num
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
          if(!this.form.seckillSpu.spuId) {
            this.$warnMsg("请选择商品")
            return
          }
          this.$http_json({
            url: `/api/seckillSpu/edit`,
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