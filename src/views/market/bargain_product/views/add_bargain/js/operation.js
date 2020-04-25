import convertHttp from '@/utils/convertHttp'
export default {
  methods: {
    getCurrentRow(item) {
      this.form.bargainSpu.name = item.name
      this.form.bargainSpu.spuId = item.id
      this.form.bargainSpu.cover = item.cover
      this.form.bargainSpu.num = item.num
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
				: ''
				value.typeName = JSON.parse(value.typeName)
				value.specs = JSON.parse(value.specs)
		    this.goodsList.push(value);
		  });
		},
		getGoodsList(page, size) {
		  this.$http_normal({
		    url: `/api/productSpu/page?page=${page - 1}&size=${
		      size
		      }&sort=sort,asc${this.productName ? `&name=${this.productName}` : ""}`,
		    method: "get"
		  }).then(result => {
        const data = result.data;
        this.product = ""
		    this.initialPage(data.totalElements);
		    this.initialGoodsList(data.content);
		  });
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if(!this.form.bargainSpu.spuId) {
            this.$warnMsg("请选择商品")
            return
          }
          this.$http_json({
            url: `/api/bargainSpu/add`,
            method: "post",
            data: this.form
          }).then(result => {
            this.$successMsg("添加成功");
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