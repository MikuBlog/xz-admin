import convertHttp from '@/utils/convertHttp'
export default {
  created() {
    this.getGoodsTypeList()
  },
  methods: {
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
					children: val.children ?
						this.handleGoodsTypeList(val.children) :
						null
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
		  this.$http_normal({
		    url: `/api/productSpu/page?page=${page - 1}&size=${
		      size
		      }&sort=sort,asc${this.name ? `&name=${this.name}` : ""}`,
		    method: "get"
		  }).then(result => {
		    const data = result.data;
		    this.initialPage(data.totalElements);
		    this.initialGoodsList(data.content);
		  });
    },
    selectGoodsType(item) {
			this.typeId = ""
    },
    selectBrand() {
      console.log(this.brandName)
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